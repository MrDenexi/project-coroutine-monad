import { Fun } from "./core"

export type Either<a, b> = {
    readonly kind: "left",
    readonly value: a
} | {
    readonly kind: "right",
    readonly value: b
}

export const inl = <a, b>(): Fun<a, Either<a, b>> => {
  return Fun((x: a): Either<a, b> => ({
    kind: "left",
    value: x
  }))
}

export const inr = <a, b>(): Fun<b, Either<a, b>> => {
  return Fun((x: b): Either<a, b> => ({
    kind: "right",
    value: x
  }))
}

export const unitEither = <a, b>(): Fun<a, Either<b, a>> => inr<b, a>()

export const joinEither = <a, b>(): Fun<Either<b, Either<b, a>>, Either<b, a>> =>
  Fun(x => x.kind == "left" ? inl<b, a>().f(x.value)
    : x.value)

export const mapEither = <a, a1, b, b1>(f: Fun<a, a1>, g: Fun<b, b1>): Fun<Either<a, b>, Either<a1, b1>> => {
  return Fun<Either<a, b>, Either<a1, b1>>((e: Either<a, b>) => {
    if (e.kind == "left") {
      const newValue = f.f(e.value)
      return inl<a1, b1>().f(newValue)
    }

    const newValue = g.f(e.value)
    return inr<a1, b1>().f(newValue)
  })
}

export const collapseEither = <a>(x:Either<a,a>) : a => x.value
