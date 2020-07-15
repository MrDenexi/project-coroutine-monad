import { Waitable, Unit, CoStep, wait, _do, repeatUntil } from '../lib'

type WaitableCounter = Waitable & { readonly Counter: number}
const waitableCounter : WaitableCounter = {wait: 0, Counter: 0}

// -- from project description
export const example = () : CoStep<WaitableCounter, string, Unit> => {
  return repeatUntil<WaitableCounter, string, Unit>(s => s.Counter > 6,
    wait<WaitableCounter,string>(3).bind(() =>
      _do(s => ({...s, Counter:s.Counter+1}))
    )
  ).fun.f(waitableCounter)
}
