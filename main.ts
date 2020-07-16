// import { id, None } from "./lib"
// import stateSample from "./samples/state-sample"
// import renderSample from "./samples/renderer"
// import { myCoroutineResult } from "./samples/coroutine-sample"
// import { myCoroutineResult } from "./samples/coroutine-project-description"

import { Map } from 'immutable'
import { Fun, Unit, Coroutine, mapCo, unitCo, coStepResult, coStepError, tryCatch, suspend, any, all } from './lib'

// eslint-disable-next-line functional/prefer-readonly-type
type Memory = Map<string, number>
// eslint-disable-next-line functional/prefer-readonly-type
type Error = "not found"

const safeGetVar = (k : string) : Coroutine<Memory,Error,number> =>
  Coroutine( (m0:Memory) => {
    if (m0.has(k)) {
      console.log('safeGetVar', k, m0.get(k))
      return coStepResult<Memory, Error, number>(m0, m0.get(k) as number)
    } else {
      console.error('safeGetVar error:', k)
      return coStepError<Memory, Error, number>("not found")
    }
  })

const setVar = (k: string, value: number) : Coroutine<Memory,Error,Unit> => {
  console.log('setVar', k, value)
  return Coroutine( (m0:Memory) => coStepResult(m0.set(k, value), {}))
}

const forceGetVar = (k: string, fallbackValue : number) : Coroutine<Memory,Error,number> => {
  console.log('forcegetVar', k, fallbackValue)
  return tryCatch(
    safeGetVar(k),
    (_:Error) => Coroutine( (m0: Memory) => {
      console.error('forcegetVar error, force it!')
      return coStepResult(m0.set(k, fallbackValue), fallbackValue)
    })
  )
}

const coOne : Coroutine<Memory,Error,number> =
  unitCo<Memory,Error>()<Unit>({})
    .bind((_:Unit) => setVar('x', 23)
      .bind((_:Unit) => setVar('y', 999)
        .bind((_:Unit) => safeGetVar('x')
          .bind((_:number) => forceGetVar('q', 12890))
        )
      )
    )

const coTwo : Coroutine<Memory,Error,number> =
  unitCo<Memory,Error>()<Unit>({})
    .bind((_:Unit) => setVar('a', 11)
      .bind((_:Unit) => setVar('b', 12)
        .bind((_:Unit) => safeGetVar('a')
          .bind((_:number) => forceGetVar('c', 99999))
        )
      )
    )

// const resultOne = coOne.fun.f(Map())
// console.log(resultOne)
// const resultTwo = coTwo.fun.f(Map())
// console.log(resultTwo)

const coSuspendOne : Coroutine<Memory,Error,number> =
  unitCo<Memory,Error>()<Unit>({})
    .suspend((_:Unit) => setVar('a', 11)
      .suspend((_:Unit) => setVar('b', 13)
        .suspend((_:Unit) => safeGetVar('a')
          .suspend((_:number) => forceGetVar('c', 99)
            .suspend((_:number) => setVar('d', 15)
              .suspend((_:Unit) => safeGetVar('b')
                .suspend((_:Unit) => safeGetVar('d')) // is 15
              )
            )
          )
        )
      )
    )

const coSuspendTwo : Coroutine<Memory,Error,number> =
  unitCo<Memory,Error>()<Unit>({})
    .suspend((_:Unit) => setVar('a', 2)
      .suspend((_:Unit) => setVar('b', 30)
        .suspend((_:Unit) => safeGetVar('a')
          .suspend((_:number) => forceGetVar('c', 44)
          )
        )
      )
    )

// const resultSuspendOne = coSuspendOne.fun.f(Map())
// console.log(resultSuspendOne)
// const resultSuspendTwo = coSuspendTwo.fun.f(Map())
// console.log(resultSuspendTwo)

// const allOneTwo = all(coSuspendOne, coSuspendTwo).fun.f(Map())
// console.log(allOneTwo)
// console.log(allOneTwo.value)
// const parallelOneTwo = coSuspendOne.parallel(coSuspendTwo).fun.f(Map())
// console.log(parallelOneTwo)
// console.log(parallelOneTwo.value)

// const anyOneTwo = any(coSuspendOne, coSuspendTwo).fun.f(Map())
// console.log(anyOneTwo)
// const concurrentOneTwo = coSuspendOne.concurrent(coSuspendTwo).fun.f(Map())
// console.log(concurrentOneTwo)

import { Waitable, CoStep, wait, _do, repeatUntil } from './lib'

// -- from project description
type WaitableCounter = Waitable & { readonly Counter: number}
const waitableCounter : WaitableCounter = {wait: 0, Counter: 0}

export const example = () : CoStep<WaitableCounter, string, Unit> => {
  return repeatUntil<WaitableCounter, string, Unit>(s => s.Counter > 6,
    wait<WaitableCounter,string>(3).bind(() =>
      _do(s => ({...s, Counter:s.Counter+1}))
    )
  ).fun.f(waitableCounter)
}

// console.log(example())


