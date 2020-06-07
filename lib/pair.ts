import { Fun } from "./core"

export type Pair<a, b> = { readonly fst: a, readonly snd: b }

export const Pair = <a, b>(fst: a, snd: b): Pair<a, b> => ({ fst: fst, snd: snd })

export const mapPair = <a, b, c, d>(f: Fun<a, c>, g: Fun<b, d>): Fun<Pair<a, b>, Pair<c, d>> => {
  return Fun((p: Pair<a, b>) => Pair(f.f(p.fst), g.f(p.snd)))
}
