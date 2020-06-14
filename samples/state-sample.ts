import { State, Unit, unitState} from "../lib"

export default function() : Unit {
  // Trying out the state
  console.log('\n --- state sample')

  type TwoVariableMemory = {
    readonly x:number,
    readonly y:number
  }

  const getVar = <s>() => <k extends keyof s>(k:k) : State<s, s[k]> =>
    State((s0) => {
      console.log('Get:', k, s0[k])
      return { fst:s0[k], snd:s0 }
    })

  const setVar = <s>() => <k extends keyof s>(k:k) => (newValue : s[k]) : State<s, Unit> =>
    State((s0) => {
      console.log('Set:', k, s0[k])
      return { fst:{}, snd:{...s0, [k]:newValue} }
    })

  const incrVar = <s>() => <k extends keyof s>(k: k) : State<s, Unit> =>
    getVar<s>()(k).bind((v : s[k]) : State<s,Unit> =>
      State<s,Unit>( (s0) => {
        if (typeof s0[k] == "number" && typeof v === "number") {
          return { fst:{}, snd:{...s0, [k]:v+1} }
        } else {
          return { fst:{}, snd:s0}
        }
      })
    )

  const decrVar = <s>() => <k extends keyof s>(k: k) : State<s, Unit> =>
    getVar<s>()(k).bind((v : s[k]) =>
      State<s,Unit>((s0:s) => {
        if (typeof s0[k] == "number" && typeof v === "number") {
          return { fst:{}, snd:{...s0, [k]:v-1} }
        } else {
          return { fst:{}, snd:s0}
        }
      })
    )

  const seq = <s>(current : State<s,Unit>, next: State<s,Unit>) : State<s,Unit> => current.bind(_ => next)
  const skip = <s>(): State<s, Unit> => unitState<s,Unit>().f({})

  const ifThenElse = <s>() => (condition: State<s,boolean>, _then: State<s,Unit>, _else: State<s,Unit> ) : State<s,Unit> =>
    condition.bind((b : boolean) => b ? _then : _else)

  const _while = <s>(condition: State<s,boolean>, body: State<s,Unit>) : State<s,Unit> =>
    condition.bind((b: boolean) => b ? body.bind(_ => _while<s>(condition, body)) : unitState<s,Unit>().f({}))

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
          mySetVar("y")(x)
        )))

  myHelloWorld.f({x: 3, y: 8})
  swap.f({x: 3, y: 8})

  return {}
}
