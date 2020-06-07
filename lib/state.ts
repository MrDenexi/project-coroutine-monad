import { Fun, id, Unit } from "./core"
import { Pair, mapPair } from "./pair"

export type State<s, a> = Fun<s, Pair<a, s>> & {
  // then: null!
}

export const unitState = <s, a>(): Fun<a, State<s, a>> =>
  Fun((a: a) => Fun((s: s) => ({ fst: a, snd: s })))

export const mapState = <s, a, b>(f: Fun<a, b>): Fun<State<s, a>, State<s, b>> =>
  Fun<State<s, a>, State<s, b>>((s: State<s, a>) => s.then(mapPair(f, id<s>())))

export const joinState = <s, a>(): Fun<State<s, State<s, a>>, State<s, a>> =>
  Fun((ss: State<s, State<s, a>>): State<s, a> => ss.then(apply()))

export const bindState = <s, a, b>(state: State<s, a>, k: Fun<a, State<s, b>>): State<s, b> =>
  mapState<s, a, State<s, b>>(k).then(joinState()).f(state)

export const apply = <a, b>(): Fun<Pair<Fun<a, b>, a>, b> =>
  Fun((fa: Pair<Fun<a,b>, a>) => fa.fst.f(fa.snd))

export const getState = <s>(): State<s, s> =>
  Fun((s: s) => ({ fst: s, snd: s }))

export const setState = <s>(s: s): State<s, Unit> =>
  Fun(_ => ({ fst: {}, snd: s }))
