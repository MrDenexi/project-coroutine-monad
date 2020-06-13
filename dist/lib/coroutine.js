"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("./core");
var either_1 = require("./either");
var pair_1 = require("./pair");
var Coroutine = function (f) { return ({
    fun: core_1.Fun(f),
    bind: function (f) {
        return bindCo()(core_1.Fun(f)).f(this);
    },
    bindF: function (f) {
        return bindCo()(f).f(this);
    },
}); };
var mapCo = function () { return function (f) {
    return core_1.Fun(function (p) {
        return Coroutine(p.fun.then(either_1.mapEither(either_1.mapEither(pair_1.mapPair(f, core_1.id()), pair_1.mapPair(mapCo()(f), core_1.id())), core_1.id())).f);
    });
}; };
var unitCo = function () { return function (x) {
    return Coroutine(function (s0) {
        return either_1.inl().f(either_1.inl().f({ fst: x, snd: s0 }));
    });
}; };
var joinCo = function () { return function (x) {
    return Coroutine(function (s0) {
        var coStep = x.fun.f(s0);
        if (coStep.kind == "left") {
            var coLeft = coStep.value;
            if (coLeft.kind == "left") {
                var coResult = coLeft.value;
                return applyCo()(coResult);
            }
            else {
                var CoContinuation = coLeft.value;
                return joinCo()(CoContinuation.fst).fun.f(CoContinuation.snd);
            }
        }
        else {
            return either_1.inr().f(coStep.value);
        }
    });
}; };
var applyCo = function () { return function (p) {
    return p.fst.fun.f(p.snd);
}; };
var bindCo = function () { return function (k) {
    return mapCo()(k)
        .then(core_1.Fun(joinCo()));
}; };
// eslint-disable-next-line functional/prefer-readonly-type
// type Memory = Map<string,number>
// type Error = "not found"
// type Instr<a> = Coroutine<Memory, Error, a>
var tryCatch = function (body, onError) {
    return Coroutine(function (s0) {
        var ran = body.fun.f(s0);
        if (ran.kind == "left") {
            var ranLeft = ran.value;
            if (ranLeft.kind == "left") {
                var ranResult = ranLeft.value;
                return either_1.inl().f(either_1.inl().f(ranResult));
            }
            else {
                var ranContinuation = ranLeft.value;
                return tryCatch(ranContinuation.fst, onError).fun.f(ranContinuation.snd);
            }
        }
        else {
            return onError(ran.value).fun.f(s0);
        }
    });
};
var suspendCo = function () {
    return Coroutine(function (s0) {
        return either_1.inl().f(either_1.inr().f({
            fst: unitCo()({}),
            snd: s0
        }));
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yb3V0aW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2Nvcm91dGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUF5QztBQUN6QyxtQ0FBc0Q7QUFDdEQsK0JBQXNDO0FBNEJ0QyxJQUFNLFNBQVMsR0FBRyxVQUFRLENBQXlCLElBQXdCLE9BQUEsQ0FBQztJQUMxRSxHQUFHLEVBQUUsVUFBRyxDQUFDLENBQUMsQ0FBQztJQUNYLElBQUksRUFBRSxVQUFxQyxDQUEyQjtRQUNwRSxPQUFPLE1BQU0sRUFBTyxDQUFDLFVBQUcsQ0FBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUQsQ0FBQztJQUNELEtBQUssRUFBRSxVQUFvQyxDQUEwQjtRQUNuRSxPQUFPLE1BQU0sRUFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0NBQ0YsQ0FBQyxFQVJ5RSxDQVF6RSxDQUFBO0FBRUYsSUFBTSxLQUFLLEdBQUcsY0FBVyxPQUFBLFVBQU0sQ0FBVTtJQUN2QyxPQUFBLFVBQUcsQ0FBQyxVQUFDLENBQW1CO1FBQ3RCLE9BQUEsU0FBUyxDQUNQLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUNSLGtCQUFTLENBQ1Asa0JBQVMsQ0FDUCxjQUFPLENBQUMsQ0FBQyxFQUFFLFNBQUUsRUFBSyxDQUFDLEVBQ25CLGNBQU8sQ0FBQyxLQUFLLEVBQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFFLEVBQUssQ0FBQyxDQUNsQyxFQUNELFNBQUUsRUFBSyxDQUNSLENBQ0YsQ0FBQyxDQUFDLENBQ0o7SUFWRCxDQVVDLENBQ0Y7QUFaRCxDQVlDLEVBYnNCLENBYXRCLENBQUE7QUFFSCxJQUFNLE1BQU0sR0FBRyxjQUFXLE9BQUEsVUFBSSxDQUFPO0lBQ25DLE9BQUEsU0FBUyxDQUFFLFVBQUMsRUFBSTtRQUNkLE9BQUEsWUFB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