import { Fun } from "./core"

export type List<a> = ({
  readonly kind: "Cons",
  readonly head: a,
  readonly tail: List<a>
} | {
  readonly kind: "Empty"
}) & {
  readonly then: <b>(this : List<a>, f: (_: a) => List<b>) => List<b>
  readonly thenF: <b>(this : List<a>, f: Fun<a, List<b>>) => List<b>
}

export const Cons = <a>(head: a, tail: List<a>): List<a> => ({
  kind: "Cons",
  head,
  tail,
  then: function<b>(this: List<a>, f: (_: a) => List<b>) : List<b> {
    return bindList(Fun(f)).f(this)
  },
  thenF: function<b>(this: List<a>, f: Fun<a,List<b>>) : List<b> {
    return bindList(f).f(this)
  }
})

export const Empty = <a>(): List<a> => ({
  kind: "Empty",
  then: function<b>(this: List<a>, f: (_: a) => List<b>) : List<b> {
    return bindList(Fun(f)).f(this)
  },
  thenF: function<b>(this: List<a>, f: Fun<a,List<b>>) : List<b> {
    return bindList(f).f(this)
  }
})

export const mapList = <a, b>(f: Fun<a, b>): Fun<List<a>, List<b>> => {
  return Fun((l: List<a>) => l.kind === "Cons" ? Cons<b>(f.f(l.head), mapList(f).f(l.tail)) : Empty<b>())
}

export const joinList = <a>() : Fun<List<List<a>>, List<a>> => {
  return Fun(
    (ll: List<List<a>>) : List<a> => {
      // if empty, create new empty
      if (ll.kind == "Empty")       return Empty<a>()
      // if contained list is empty, continue with tail
      if (ll.head.kind == "Empty")  return joinList<a>().f(ll.tail)
      // else join tail, and concat with head
      return concatList<a>(ll.head).f(
        joinList<a>().f(ll.tail)
      )
    }
  )
}

export const bindList = <a,b>(k: Fun<a, List<b>>) : Fun<List<a>,List<b>> => {
  return mapList<a,List<b>>(k).then(joinList<b>())
}

export const concatList = <a>(l1: List<a>): Fun<List<a>, List<a>> => {
  return Fun(
    (l2 : List<a>) =>
      l1.kind == "Empty" ? l2 : Cons(l1.head, concatList(l1.tail).f(l2))
  )
}

export const pushToList = <a>(l: List<a>) : Fun<a, List<a>> => {
  return Fun(
    (x:a) =>
      l.kind == "Empty" ? Cons<a>(x, Empty<a>()) : Cons<a>(l.head, pushToList<a>(l.tail).f(x))
  )
}
