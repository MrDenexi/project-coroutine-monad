// eslint-disable-next-line @typescript-eslint/ban-types
export type Unit = {}

export type Id<a> = a
export const id = <a>() : Fun<Id<a>, Id<a>> => Fun(x => x)
export const map_Id = <a, b>(f: Fun<a, b>): Fun<Id<a>, Id<b>> => f;

export type Fun<A, B> = {
  readonly f: (_: A) => B,
  readonly then: <C>(this: Fun<A, B>, g: Fun<B, C>) => Fun<A, C>,
  readonly repeat: (this: Fun<A, A>) => Fun<number, Fun<A, A>>,
  readonly repeatUntil: () => Fun<Fun<A, boolean>, Fun<A, A>>
};

export const Fun = <A, B>(f: (x: A) => B): Fun<A, B> => ({
  f: f,
  then: function <C>(this: Fun<A, B>, g: Fun<B, C>) {
    return Fun<A, C>((x: A) => g.f(this.f(x)))
  },
  repeat: function (this: Fun<A, A>): Fun<number, Fun<A, A>> {
    return Fun(n => repeat(this, n));
  },
  repeatUntil: function (this: Fun<A, A>): Fun<Fun<A, boolean>, Fun<A, A>> {
    return Fun(p => repeatUntil(this, p))
  }
})

const repeat = <a>(f: Fun<a, a>, n: number): Fun<a, a> => n <= 1 ? f : f.then(repeat(f, n - 1))

const repeatUntil = <a>(f: Fun<a, a>, predicate: Fun<a, boolean>): Fun<a, a> => (
  Fun<a,a>((x: a) => (predicate.f(x)) ? id<a>().f(x) : f.then(repeatUntil(f, predicate)).f(x))
)
