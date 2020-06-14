import { Map, List } from 'immutable'

import { Fun, Unit } from '../lib'
import { Coroutine, mapCo, unitCo, coStepResult, coStepError, tryCatch, suspend } from '../lib'

export default function() : Unit {
  console.log(' --- coroutine sample')

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
        console.error('forcegetVar error')
        return coStepResult(m0.set(k, fallbackValue), fallbackValue)
      })
    )
  }

  const myCoroutine : Coroutine<Memory,Error,Unit> =
    unitCo<Memory,Error>()<Unit>({})
      .bind((_:Unit) => setVar('x', 23)
        .bind((_:Unit) => setVar('y', 24)
          .bind((_:Unit) => suspend<Memory,Error>()
            .bind((_:Unit) => safeGetVar('x')
              .bind((_:number) => forceGetVar('y', 12)
                .bind((_:number) => suspend())
              )
            )
          )
        )
      )

  const myCoroutineResult = myCoroutine.fun.f(Map())
  console.log(myCoroutineResult)

  // From project description
  //
  // RepeatUntil(s => s.Counter > 10,
  //   Wait(5).then(() =>
  //   Do(s => ({...s, Counter:s.Counter+1}))
  //   )
  // )

  return {}
}
