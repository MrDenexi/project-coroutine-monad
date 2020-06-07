import { Fun, id, Unit } from "./core"
import { Pair, mapPair } from "./pair"

export type State<s, a> = Fun<s, Pair<a, s>> & {
  readonly bind: <b>(this: State<s,a>, k: (x:a) => State<s,b>) => State<s,b>,
  readonly bindF: <b>(this: State<s,a>, k: Fun<a, State<s,b>>) => State<s,b>,
}

export const State = <s,a>(f : (s : s) => Pair<a,s>) : State<s, a> =>({
  ...Fun(f),
  bind: function<b>(this: State<s,a>, k: (x:a) => State<s,b>) {
    return bindState(this, Fun(k))
  },
  bindF: function<b>(this: State<s,a>, k:Fun<a, State<s,b>>) {
    return bindState(this, k)
  }
})

export const unitState = <s, a>(): Fun<a, State<s, a>> =>
  Fun((a: a) => State((s: s) => ({ fst: a, snd: s })))

export const mapState = <s, a, b>(f: Fun<a, b>): Fun<State<s, a>, State<s, b>> =>
  Fun<State<s, a>, State<s, b>>(
    (s: State<s, a>) => State(s.then(mapPair(f, id<s>())).f)
  )

export const joinState = <s, a>(): Fun<State<s, State<s, a>>, State<s, a>> =>
  Fun(
    (ss: State<s, State<s, a>>) => State(ss.then(apply()).f)
  )

export const bindState = <s, a, b>(state: State<s, a>, k: Fun<a, State<s, b>>): State<s, b> =>
  mapState<s, a, State<s, b>>(k).then(joinState()).f(state)

export const apply = <s, a>(): Fun<Pair<State<s, a>, s>, Pair<a, s>> =>
  Fun((fa: Pair<State<s,a>, s>) => fa.fst.f(fa.snd))

export const getState = <s>(): State<s, s> =>
  State((s: s) => ({ fst: s, snd: s}))

export const setState = <s>(s: s): State<s, Unit> =>
  State(_ => ({ fst: {}, snd: s }))
