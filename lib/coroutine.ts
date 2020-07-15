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
  readonly suspend: <b>( f:((x: a) => Coroutine<s,e,b>)) => Coroutine<s,e,b>,
  readonly suspendF:  <b>(f: Fun<a,Coroutine<s,e,b>>) => Coroutine<s,e,b>,
  readonly concurrent: (cor: Coroutine<s,e,a>) => Coroutine<s,e,a>
  readonly parallel: <b>(cor: Coroutine<s,e,b>) => Coroutine<s,e,Pair<a,b>>
}

export const Coroutine = <s,e,a>(f: (s0:s) => CoStep<s,e,a>) : Coroutine<s,e,a> => ({
  fun: Fun(f),
  bind: function<a,b>(this:Coroutine<s,e,a>, f:(_:a) => Coroutine<s,e,b>) : Coroutine<s,e,b> {
    return bindCo<s,e>()(Fun<a,Coroutine<s,e,b>>(f)).f(this)
  },
  bindF: function<b>(this: Coroutine<s,e,a>, f: Fun<a,Coroutine<s,e,b>>) : Coroutine<s,e,b> {
    return bindCo<s,e>()(f).f(this)
  },
  suspend: function<b>(this: Coroutine<s,e,a>, f:(_:a) => Coroutine<s,e,b>) : Coroutine<s,e,b> {
    return Coroutine((s1:s) => coStepContinuation(s1, this.bind(f)))
  },
  suspendF: function<b>(this: Coroutine<s,e,a>, f: Fun<a,Coroutine<s,e,b>>) : Coroutine<s,e,b> {
    return Coroutine((s1:s) => coStepContinuation(s1, this.bindF(f)))
  },
  concurrent: function(this: Coroutine<s,e,a>, cor: Coroutine<s,e,a>) : Coroutine<s,e,a> {
    return any(this, cor)
  },
  parallel: function<b>(this:Coroutine<s,e,a>, cor: Coroutine<s,e,b>) : Coroutine<s,e,Pair<a,b>> {
    return all(this, cor)
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

export const coStepContinuation = <s,e,a>(s: s, c: Coroutine<s,e,a>) : CoStep<s,e,a> =>
  inl<CoLeft<s,e,a>, e>().f(
    inr<CoResult<s,a>, CoContinuation<s,e,a>>().f({
      fst: c,
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
  Coroutine((s0: s) => coStepContinuation(s0, unitCo<s,e>()({})))

export const any = <s,e,a>(c1 : Coroutine<s,e,a>, c2 : Coroutine<s,e,a>) : Coroutine<s,e,a> =>
  Coroutine((s:s) : CoStep<s,e,a> => {
    // set output1
    const o1 = c1.fun.f(s)

    // continuation
    if (o1.kind === "left" && o1.value.kind === "right") {
      const o1Continuation = o1.value.value
      return any(c2, o1Continuation.fst).fun.f(o1Continuation.snd)
    }

    // error or result
    return o1
  })

export const all = <s,e,a,b>(c1 : Coroutine<s,e,a>, c2 : Coroutine<s,e,b>) : Coroutine<s,e,Pair<a,b>> =>
  Coroutine((s0:s) : CoStep<s,e,Pair<a,b>> => {
    // set output1
    const o1 = c1.fun.f(s0)

    // result or continuation
    if (o1.kind === "left") {
      const o1Left = o1.value

      // result
      if (o1Left.kind === "left") {
        const o1Result = o1Left.value

        // force o2 result
        const o2 = c2.bind<b>(
          (x:b) => unitCo<s,e>()<b>(x)
        ).fun.f(o1Result.snd)

        // o2 error
        if (o2.kind === "right") {
          return o2
        }

        // --- 📝📝 official agreement 📝📝 ---
        // I am really sure unitCo spits out a result
        // so hereby i am allowed to typecast that
        const o2Result = o2.value.value as CoResult<s,b>

        return coStepResult(
          o2Result.snd,
          Pair(o1Result.fst, o2Result.fst)
        )
      } else {
        // continuation
        const o1Continuation = o1Left.value

        // run all() again in reverse order
        // and switch back pair on result
        const switchResult = mapCo<s,e>()(
          Fun<Pair<b,a>,Pair<a,b>>(
            (p: Pair<b,a>) => ({fst: p.snd, snd: p.fst})
          )
        )

        return switchResult.f(
          all<s,e,b,a>(c2, o1Continuation.fst)
        ).fun.f(o1Continuation.snd)

        // this also works
        // return all<s,e,b,a>(c2, o1Continuation.fst)
        //   .bind((p: Pair<b,a>) => Coroutine(s => coStepResult<s,e,Pair<a,b>>(s, {fst: p.snd, snd: p.fst})))
        //   .fun.f(o1Continuation.snd)
      }
    } else {
      // error
      return o1
    }
  })

export const repeatUntil = <s,e,a>(predicate : ((_:s) => boolean), cor : Coroutine<s,e,a>) : Coroutine<s,e,a> =>
  Coroutine( (s0:s) => {
    const ran = cor.fun.f(s0)
    if (ran.kind == "left") {
      const ranLeft = ran.value
      if (ranLeft.kind == "left") {
        const ranResult = ranLeft.value
        // return result or repeat result
        return predicate(ranResult.snd) ? ran : repeatUntil(predicate, cor).fun.f(ranResult.snd)
      } else {
        // repeat continuation always
        const ranContinuation = ranLeft.value
        return repeatUntil(predicate, ranContinuation.fst).fun.f(ranContinuation.snd)
      }
    } else {
      // error
      return ran
    }
  })


export const _do = <s,e>(f : ((_:s) => s)) : Coroutine<s,e,Unit> =>
  Coroutine<s,e,Unit>(s => coStepResult(f(s), {}))

export type Waitable  = {readonly wait : number}

export const wait = <s extends Waitable,e>(sec : number) : Coroutine<s,e,Unit> => {
  console.log('start wait')
  return Coroutine<s,e,Unit>(s0 => coStepResult({...s0, wait: (Date.now() + sec * 1000)}, {}))
    .bind<Unit>( (_: Unit) => checkWait())
}

// helper function for wait
export const checkWait = <s extends Waitable, e>() : Coroutine<s,e,Unit> =>
  Coroutine((s:s) : CoStep<s,e,Unit> => {
    const now = Date.now()
    console.log('--- checkwait')
    console.log('time now:', now / 1000)
    console.log('time in state:', s['wait'] / 1000)
    if (s['wait'] < Date.now()) {
      console.log('result:', s)
      return coStepResult({...s, wait: 0}, {})
    } else {
      console.log('continuation:' )
      // eslint-disable-next-line functional/no-let
      let i = 0
      // eslint-disable-next-line functional/no-loop-statement
      while (i < 100) {
        i = Date.now() - now
      }
      return coStepContinuation(s, checkWait())
    }
  })
