import { Fun } from "./core"

export type Option<T> = ({
  readonly kind: "None"
} | {
  readonly kind: "Some",
  readonly value: T
}) & {
  readonly then: <U>(this : Option<T>, f: ((_:T) => Option<U>)) => Option<U>,
  readonly thenF: <U>(this : Option<T>, f: Fun<T, Option<U>>) => Option<U>
}

export const Some = <T>(x : T) : Option<T> => ({
  kind: "Some",
  value: x,
  then: function<U>(this: Option<T>, f: ((_:T) => Option<U>)) : Option<U> {
    return bindOption(Fun(f)).f(this)
  },
  thenF: function<U>(this: Option<T>, f: Fun<T, Option<U>>) : Option<U> {
    return bindOption(f).f(this)
  }
});

export const None = <T>() : Option<T> => ({
  kind: "None",
  then: function<U>(this: Option<T>, f: ((_:T) => Option<U>)) : Option<U> {
    return bindOption(Fun(f)).f(this)
  },
  thenF: function<U>(this: Option<T>, f: Fun<T, Option<U>>) : Option<U> {
    return bindOption(f).f(this)
  }
})

export const mapOption = <a,b>(f: Fun<a,b>) : Fun<Option<a>, Option<b>> => {
  return Fun( (o: Option<a>) : Option<b> => o.kind == 'Some' ? Some<b>(f.f(o.value)) : None<b>());
}

export const joinOption = <a>() : Fun<Option<Option<a>>, Option<a>> => {
  return Fun( (oo: Option<Option<a>>) => oo.kind === "None" ? None<a>() : oo.value)
}

export const bindOption = <a, b>(f: Fun<a,Option<b>>) : Fun<Option<a>,Option<b>> => {
  return mapOption(f).then(joinOption<b>())
}
