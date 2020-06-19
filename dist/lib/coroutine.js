"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("./core");
var either_1 = require("./either");
var pair_1 = require("./pair");
exports.Coroutine = function (f) { return ({
    fun: core_1.Fun(f),
    bind: function (f) {
        return exports.bindCo()(core_1.Fun(f)).f(this);
    },
    bindF: function (f) {
        return exports.bindCo()(f).f(this);
    },
    concurrent: function (cor) {
        return any(this, cor);
    },
    parallel: function (cor) {
        return all(this, cor);
    }
}); };
exports.mapCo = function () { return function (f) {
    return core_1.Fun(function (p) {
        return exports.Coroutine(p.fun.then(either_1.mapEither(either_1.mapEither(pair_1.mapPair(f, core_1.id()), pair_1.mapPair(exports.mapCo()(f), core_1.id())), core_1.id())).f);
    });
}; };
exports.unitCo = function () { return function (x) {
    return exports.Coroutine(function (s0) {
        return either_1.inl().f(either_1.inl().f({ fst: x, snd: s0 }));
    });
}; };
exports.joinCo = function () { return function (x) {
    return exports.Coroutine(function (s0) {
        var coStep = x.fun.f(s0);
        if (coStep.kind == "left") {
            var coLeft = coStep.value;
            if (coLeft.kind == "left") {
                var coResult = coLeft.value;
                return exports.applyCo()(coResult);
            }
            else {
                var coContinuation = coLeft.value;
                return exports.joinCo()(coContinuation.fst).fun.f(coContinuation.snd);
            }
        }
        else {
            return either_1.inr().f(coStep.value);
        }
    });
}; };
exports.applyCo = function () { return function (p) {
    return p.fst.fun.f(p.snd);
}; };
exports.bindCo = function () { return function (k) {
    return exports.mapCo()(k)
        .then(core_1.Fun(exports.joinCo()));
}; };
exports.coStepError = function (error) {
    return either_1.inr().f(error);
};
exports.coStepResult = function (s, x) {
    return either_1.inl().f(either_1.inl().f({ fst: x, snd: s }));
};
exports.coStepContinuation = function (s) {
    return either_1.inl().f(either_1.inr().f({
        fst: exports.unitCo()({}),
        snd: s
    }));
};
exports.tryCatch = function (body, onError) {
    return exports.Coroutine(function (s0) {
        var ran = body.fun.f(s0);
        if (ran.kind == "left") {
            var ranLeft = ran.value;
            if (ranLeft.kind == "left") {
                var ranResult = ranLeft.value;
                return either_1.inl().f(either_1.inl().f(ranResult));
            }
            else {
                var ranContinuation = ranLeft.value;
                return exports.tryCatch(ranContinuation.fst, onError).fun.f(ranContinuation.snd);
            }
        }
        else {
            return onError(ran.value).fun.f(s0);
        }
    });
};
exports.suspend = function () {
    return exports.Coroutine(function (s0) { return exports.coStepContinuation(s0); });
};
var any = function (c1, c2) {
    return exports.Coroutine(function (s) {
        // set output1
        var o1 = c1.fun.f(s);
        // continuation
        if (o1.kind === "left" && o1.value.kind === "right") {
            var o1Continuation = o1.value.value;
            return any(c2, o1Continuation.fst).fun.f(o1Continuation.snd);
        }
        // error or result
        return o1;
    });
};
var all = function (c1, c2) {
    return exports.Coroutine(function (s0) {
        // set output1
        var o1 = c1.fun.f(s0);
        // result or continuation
        if (o1.kind === "left") {
            var o1Left = o1.value;
            // result
            if (o1Left.kind === "left") {
                var o1Result = o1Left.value;
                // force o2 result
                var o2 = c2.bind(function (x) { return exports.unitCo()(x); }).fun.f(o1Result.snd);
                // o2 error
                if (o2.kind === "right") {
                    return o2;
                }
                // I'm really sure unitCo spits out a result
                // so i'm allowed to typecast that
                var o2Result = o2.value.value;
                return exports.coStepResult(o2Result.snd, pair_1.Pair(o1Result.fst, o2Result.fst));
            }
            else {
                // continuation
                var o1Continuation = o1Left.value;
                // run all() again in reverse order
                // and switch back pair on result
                return all(c2, o1Continuation.fst)
                    .bind(function (p) { return exports.Coroutine(function (s) { return exports.coStepResult(s, { fst: p.snd, snd: p.fst }); }); })
                    .fun.f(o1Continuation.snd);
            }
        }
        else {
            // error
            return o1;
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yb3V0aW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2Nvcm91dGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUF5QztBQUN6QyxtQ0FBc0Q7QUFDdEQsK0JBQXNDO0FBOEJ6QixRQUFBLFNBQVMsR0FBRyxVQUFRLENBQXlCLElBQXdCLE9BQUEsQ0FBQztJQUNqRixHQUFHLEVBQUUsVUFBRyxDQUFDLENBQUMsQ0FBQztJQUNYLElBQUksRUFBRSxVQUFxQyxDQUEyQjtRQUNwRSxPQUFPLGNBQU0sRUFBTyxDQUFDLFVBQUcsQ0FBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUQsQ0FBQztJQUNELEtBQUssRUFBRSxVQUFvQyxDQUEwQjtRQUNuRSxPQUFPLGNBQU0sRUFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBQ0QsVUFBVSxFQUFFLFVBQWlDLEdBQXFCO1FBQ2hFLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBQ0QsUUFBUSxFQUFFLFVBQW1DLEdBQXFCO1FBQ2hFLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUN2QixDQUFDO0NBQ0YsQ0FBQyxFQWRnRixDQWNoRixDQUFBO0FBRVcsUUFBQSxLQUFLLEdBQUcsY0FBVyxPQUFBLFVBQU0sQ0FBVTtJQUM5QyxPQUFBLFVBQUcsQ0FBQyxVQUFDLENBQW1CO1FBQ3RCLE9BQUEsaUJBQVMsQ0FDUCxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FDUixrQkFBUyxDQUNQLGtCQUFTLENBQ1AsY0FBTyxDQUFDLENBQUMsRUFBRSxTQUFFLEVBQUssQ0FBQyxFQUNuQixjQUFPLENBQUMsYUFBSyxFQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBRSxFQUFLLENBQUMsQ0FD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