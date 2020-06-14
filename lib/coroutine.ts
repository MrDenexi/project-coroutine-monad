import { Fun, Id, id, Unit} from "./core"
import { Either, inl, inr, mapEither } from "./either"
import { Pair, mapPair } from "./pair"

// import { Map } from "immutable"

export type CoFun<s,e,a> =
  Fun<s,
    Either<
      Either<
        Pair<a,s>,
        Pair<Coroutine<s,e,a>,s>
      >,
      e
    >
  >

export type CoStep<s,e,a> = Either<CoLeft<s,e,a>,e>
  export type CoLeft<s,e,a> = Either<CoResult<s,a>,CoContinuation<s,e,a>>
    export type CoResult<s,a> = Pair<a,s>
    export type CoContinuation<s,e,a> = Pair<Coroutine<s,e,a>,s>
  export type CoError<e> = e

export type Coroutine<s,e,a> ={
  readonly fun: CoFun<s,e,a>
  // eslint-disable-next-line functional/no-mixed-type
  readonly bind: <b>( f:((x: a) => Coroutine<s,e,b>)) => Coroutine<s,e,b>,
  readonly bindF: <b>(f: Fun<a,Coroutine<s,e,b>>) => Coroutine<s,e,b>,
}

export const Coroutine = <s,e,a>(f: (s:s) => CoStep<s,e,a>) : Coroutine<s,e,a> => ({
  fun: Fun(f),
  bind: function<a,b>(this:Coroutine<s,e,a>, f:(_:a) => Coroutine<s,e,b>) : Coroutine<s,e,b> {
    return bindCo<s,e>()(Fun<a,Coroutine<s,e,b>>(f)).f(this)
  },
  bindF: function<b>(this: Coroutine<s,e,a>, f: Fun<a,Coroutine<s,e,b>>) : Coroutine<s,e,b> {
    return bindCo<s,e>()(f).f(this)
  }
})

export const mapCo = <s,e>() => <a,b>(f:Fun<a,b>) : Fun<Coroutine<s,e,a>, Coroutine<s,e,b>> =>
  Fun((p: Coroutine<s,e,a>) : Coroutine<s,e,b> =>
    Coroutine<s,e,b>(
      p.fun.then<CoStep<s,e,b>>(
        mapEither(
          mapEither(
            mapPair(f, id<s>()),
            mapPair(mapCo<s,e>()(f), id<s>())
          ),
          id<e>()
        )
      ).f
    )
  )

export const unitCo = <s,e>() => <a>(x:Id<a>) : Coroutine<s,e,a> =>
  Coroutine( (s0:s) =>
    inl<CoLeft<s,e,a>, e>().f(
      inl<CoResult<s,a>, CoContinuation<s,e,a>>().f({ fst:x, snd:s0})
    )
  )

export const joinCo = <s,e>() => <a>(x : Coroutine<s,e,Coroutine<s,e,a>>) : Coroutine<s,e,a> =>
  Coroutine((s0:s) : CoStep<s,e,a> => {
    const coStep = x.fun.f(s0)
    if (coStep.kind == "left") {
      const coLeft = coStep.value
      if (coLeft.kind == "left") {
        const coResult = coLeft.value
        return applyCo<s,e>()<a>(coResult)
      } else {
        const coContinuation = coLeft.value
        return joinCo<s,e>()<a>(coContinuation.fst).fun.f(coContinuation.snd)
      }
    } else {
      return inr<CoLeft<s,e,a>, e>().f(coStep.value)
    }
  })

export const applyCo = <s,e>() => <a>(p: Pair<Coroutine<s,e,a>,s>) : CoStep<s,e,a> =>
  p.fst.fun.f(p.snd)

export const bindCo = <s, e>() => <a,b>(k: Fun<a, Coroutine<s, e, b>>): Fun<Coroutine<s,e,a>,Coroutine<s,e,b>> =>
  mapCo<s,e>()<a,Coroutine<s,e,b>>(k)
    .then<Coroutine<s,e,b>>(
      Fun(joinCo<s,e>())
    )

export const coStepError = <s,e,a>(error: e) : CoStep<s,e,a> =>
  inr<CoLeft<s,e,a>, e>().f(error)

export const coStepResult = <s,e,a>(s: s, x: a) : CoStep<s,e,a> =>
  inl<CoLeft<s,e,a>, e>().f(
    inl<CoResult<s,a>, CoContinuation<s,e,a>>().f({ fst:x, snd:s})
  )

export const coStepContinuation = <s,e>(s: s) : CoStep<s,e,Unit> =>
  inl<CoLeft<s,e,Unit>, e>().f(
    inr<CoResult<s,Unit>, CoContinuation<s,e,Unit>>().f({
      fst: unitCo<s,e>()<Unit>({}),
      snd: s
    })
  )

export const tryCatch = <s,e,a>(body: Coroutine<s,e,a>, onError:(_:e) => Coroutine<s,e,a>) : Coroutine<s,e,a> =>
  Coroutine( (s0:s) : CoStep<s,e,a> => {
    const ran = body.fun.f(s0)
    if (ran.kind == "left") {
      const ranLeft = ran.value
      if (ranLeft.kind == "left") {
        const ranResult = ranLeft.value
        return inl<CoLeft<s,e,a>, e>().f(
          inl<CoResult<s,a>, CoContinuation<s,e,a>>().f(ranResult)
        )
      } else {
        const ranContinuation = ranLeft.value
        return tryCatch(ranContinuation.fst, onError).fun.f(ranContinuation.snd)
      }
    } else {
      return onError(ran.value).fun.f(s0)
    }
  })

export const suspend = <s,e>() : Coroutine<s,e,Unit> =>
  Coroutine((s0: s) => coStepContinuation(s0))

