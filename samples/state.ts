import { State, Unit } from "../lib"

export default function() : Unit {
  // Trying out the state
  console.log('\n --- state sample')

  type TwoVariableMemory = {
    readonly x:number,
    readonly y:number
  }

  const getVar = <s>() => <k extends keyof s>(k:k) : State<s, s[k]> =>
    State((s0 : s ) => {
      console.log('Get:', k, s0[k])
      return { fst:s0[k], snd:s0 }
    })

  const setVar = <s>() => <k extends keyof s>(k:k) => (newValue : s[k]) : State<s, Unit> =>
    State((s0) => {
      console.log('Set:', k, s0[k])
      return { fst:{}, snd:{...s0, [k]:newValue} }
    })

  const myGetVar = getVar<TwoVariableMemory>()
  const mySetVar = setVar<TwoVariableMemory>()

  const myHelloWorld : State<TwoVariableMemory, Unit> =
    myGetVar("x").bind(x =>
    myGetVar("y").bind(y =>
    mySetVar("x")(x + y).bind(_ =>
    mySetVar("y")(y * x).bind(_ =>
    myGetVar("x").bind(_ =>
    myGetVar("y").bind(_ =>
    mySetVar("x")(x + y)
  ))))))

  const swap : State<TwoVariableMemory, Unit> =
    myGetVar("x").bind(x =>
    myGetVar("y").bind(y =>
    mySetVar("x")(y).bind(_ =>
    mySetVar("y")(x).bind(_ =>
    myGetVar("x").bind(_ =>
    myGetVar("y").bind(_ =>
    mySetVar("x")(y)
    ))))))

  myHelloWorld.f({x: 3, y: 8})
  swap.f({x: 3, y: 8})

  return {}
}
