import { Fun, Id, id, Unit} from "./core"
import { Either, inl, inr, mapEither } from "./either"
import { Pair, mapPair } from "./pair"

// import { Map } from "immutable"

type CoFun<s,e,a> =
  Fun<s,
    Either<
      Either<
        Pair<a,s>,
        Pair<Coroutine<s,e,a>,s>
      >,
      e
    >
  >

type CoStep<s,e,a> = Either<CoLeft<s,e,a>,e>
  type CoLeft<s,e,a> = Either<CoResult<s,a>,CoContinuation<s,e,a>>
    type CoResult<s,a> = Pair<a,s>
    type CoContinuation<s,e,a> = Pair<Coroutine<s,e,a>,s>
  type CoRight<e> = e

type Coroutine<s,e,a> ={
  readonly fun: CoFun<s,e,a>
  // eslint-disable-next-line functional/no-mixed-type
  readonly bind: <b>( f:((x: a) => Coroutine<s,e,b>)) => Coroutine<s,e,b>,
  readonly bindF:  <b>(f: Fun<a,Coroutine<s,e,b>>) => Coroutine<s,e,b>,
}

const Coroutine = <s,e,a>(f: (s:s) => CoStep<s,e,a>) : Coroutine<s,e,a> => ({
  fun: Fun(f),
  bind: function<a,b>(this:Coroutine<s,e,a>, f:(_:a) => Coroutine<s,e,b>) : Coroutine<s,e,b> {
    return bindCo<s,e>()(Fun<a,Coroutine<s,e,b>>(f)).f(this)
  },
  bindF: function<b>(this: Coroutine<s,e,a>, f: Fun<a,Coroutine<s,e,b>>) : Coroutine<s,e,b> {
    return bindCo<s,e>()(f).f(this)
  },
})

const mapCo = <s,e>() => <a,b>(f:Fun<a,b>) : Fun<Coroutine<s,e,a>, Coroutine<s,e,b>> =>
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

const unitCo = <s,e>() => <a>(x:Id<a>) : Coroutine<s,e,a> =>
  Coroutine( (s0:s) =>
    inl<CoLeft<s,e,a>, e>().f(
      inl<CoResult<s,a>, CoContinuation<s,e,a>>().f({ fst:x, snd:s0})
    )
  )

const joinCo = <s,e>() => <a>(x : Coroutine<s,e,Coroutine<s,e,a>>) : Coroutine<s,e,a> =>
  Coroutine((s0:s) : CoStep<s,e,a> => {
    const coStep = x.fun.f(s0)
    if (coStep.kind == "left") {
      const coLeft = coStep.value
      if (coLeft.kind == "left") {
        const coResult = coLeft.value
        return applyCo<s,e>()<a>(coResult)
      } else {
        const CoContinuation = coLeft.value
        return joinCo<s,e>()<a>(CoContinuation.fst).fun.f(CoContinuation.snd)
      }
    } else {
      return inr<CoLeft<s,e,a>, e>().f(coStep.value)
    }
  })

const applyCo = <s,e>() => <a>(p: Pair<Coroutine<s,e,a>,s>) : CoStep<s,e,a> =>
  p.fst.fun.f(p.snd)

const bindCo = <s, e>() => <a,b>(k: Fun<a, Coroutine<s, e, b>>): Fun<Coroutine<s,e,a>,Coroutine<s,e,b>> =>
  mapCo<s,e>()<a,Coroutine<s,e,b>>(k)
    .then<Coroutine<s,e,b>>(
      Fun(joinCo<s,e>())
    )

// eslint-disable-next-line functional/prefer-readonly-type
// type Memory = Map<string,number>
// type Error = "not found"
// type Instr<a> = Coroutine<Memory, Error, a>

const tryCatch = <s,e,a>(body: Coroutine<s,e,a>, onError:(_:e) => Coroutine<s,e,a>) : Coroutine<s,e,a> =>
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

const suspendCo = <s,e>() : Coroutine<s,e,Unit> =>
  Coroutine( (s0: s) =>
    inl<CoLeft<s,e,Unit>, e>().f(
      inr<CoResult<s,Unit>, CoContinuation<s,e,Unit>>().f({
        fst: unitCo<s,e>()<Unit>({}),
        snd: s0
      })
    )
  )

