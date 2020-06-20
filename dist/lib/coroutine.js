"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        return exports.any(this, cor);
    },
    parallel: function (cor) {
        return exports.all(this, cor);
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
exports.coStepContinuation = function (s, c) {
    return either_1.inl().f(either_1.inr().f({
        fst: c,
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
    return exports.Coroutine(function (s0) { return exports.coStepContinuation(s0, exports.unitCo()({})); });
};
exports.any = function (c1, c2) {
    return exports.Coroutine(function (s) {
        // set output1
        var o1 = c1.fun.f(s);
        // continuation
        if (o1.kind === "left" && o1.value.kind === "right") {
            var o1Continuation = o1.value.value;
            return exports.any(c2, o1Continuation.fst).fun.f(o1Continuation.snd);
        }
        // error or result
        return o1;
    });
};
exports.all = function (c1, c2) {
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
                // I am really sure unitCo spits out a result
                // so hereby i am allowed to typecast that
                var o2Result = o2.value.value;
                return exports.coStepResult(o2Result.snd, pair_1.Pair(o1Result.fst, o2Result.fst));
            }
            else {
                // continuation
                var o1Continuation = o1Left.value;
                // run all() again in reverse order
                // and switch back pair on result
                var switchResult = exports.mapCo()(core_1.Fun(function (p) { return ({ fst: p.snd, snd: p.fst }); }));
                return switchResult.f(exports.all(c2, o1Continuation.fst)).fun.f(o1Continuation.snd);
                // this also works
                // return all<s,e,b,a>(c2, o1Continuation.fst)
                //   .bind((p: Pair<b,a>) => Coroutine(s => coStepResult<s,e,Pair<a,b>>(s, {fst: p.snd, snd: p.fst})))
                //   .fun.f(o1Continuation.snd)
            }
        }
        else {
            // error
            return o1;
        }
    });
};
var repeatUntil = function (predicate, cor) {
    return exports.Coroutine(function (s0) {
        var ran = cor.fun.f(s0);
        if (ran.kind == "left") {
            var ranLeft = ran.value;
            if (ranLeft.kind == "left") {
                var ranResult = ranLeft.value;
                // return result or repeat result
                return predicate(ranResult.snd) ? ran : repeatUntil(predicate, cor).fun.f(ranResult.snd);
            }
            else {
                // repeat continuation always
                var ranContinuation = ranLeft.value;
                return repeatUntil(predicate, ranContinuation.fst).fun.f(ranContinuation.snd);
            }
        }
        else {
            // error
            return ran;
        }
    });
};
var _do = function (f) {
    return exports.Coroutine(function (s) { return exports.coStepResult(f(s), {}); });
};
var wait = function (sec) {
    return exports.Coroutine(function (s0) { return exports.coStepResult(__assign(__assign({}, s0), { wait: sec * 1000 }), {}); })
        .bind(function (_) { return checkWait(); });
};
var checkWait = function () {
    return exports.Coroutine(function (s) {
        return s['wait'] > Date.now() ? exports.coStepResult(__assign(__assign({}, s), { wait: 0 }), {}) : exports.coStepContinuation(s, checkWait());
    });
};
var waitableCounter = { wait: 0, Counter: 0 };
// -- from project description
repeatUntil(function (s) { return s.Counter > 10; }, wait(5).bind(function () {
    return _do(function (s) { return (__assign(__assign({}, s), { Counter: s.Counter + 1 })); });
})).fun.f(waitableCounter);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yb3V0aW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2Nvcm91dGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQXlDO0FBQ3pDLG1DQUFzRDtBQUN0RCwrQkFBc0M7QUE4QnpCLFFBQUEsU0FBUyxHQUFHLFVBQVEsQ0FBeUIsSUFBd0IsT0FBQSxDQUFDO0lBQ2pGLEdBQUcsRUFBRSxVQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ1gsSUFBSSxFQUFFLFVBQXFDLENBQTJCO1FBQ3BFLE9BQU8sY0FBTSxFQUFPLENBQUMsVUFBRyxDQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxRCxDQUFDO0lBQ0QsS0FBSyxFQUFFLFVBQW9DLENBQTBCO1FBQ25FLE9BQU8sY0FBTSxFQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2pDLENBQUM7SUFDRCxVQUFVLEVBQUUsVUFBaUMsR0FBcUI7UUFDaEUsT0FBTyxXQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFDRCxRQUFRLEVBQUUsVUFBbUMsR0FBcUI7UUFDaEUsT0FBTyxXQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7Q0FDRixDQUFDLEVBZGdGLENBY2hGLENBQUE7QUFFVyxRQUFBLEtBQUssR0FBRyxjQUFXLE9BQUEsVUFBTSxDQUFVO0lBQzlDLE9BQUEsVUFBRyxDQUFDLFVBQUMsQ0FBbUI7UUFDdEIsT0FBQSxpQkFBUyxDQUNQLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUNSLGtCQUFTLENBQ1Asa0JBQVMsQ0FDUCxjQUFPLENBQUMsQ0FBQyxFQUFFLFNBQUUsRUFBSyxDQUFDLEVBQ25CLGNBQU8sQ0FBQyxhQUFLLEVBQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFFLEVBQUssQ0FBQyxDQUNsQyxFQUNELFNBQUUsRUFBSyxDQUNSLENBQ0YsQ0FBQyxDQUFDLENBQ0o7SUFWRCxDQVVDLENBQ0Y7QUFaRCxDQVlDLEVBYjZCLENBYTdCLENBQUE7QUFFVSxRQUFBLE1BQU0sR0FBRyxjQUFXLE9BQUEsVUFBSSxDQUFPO0lBQzFDLE9BQUEsaUJBQVMsQ0FBRSxVQUFDLEVBQUk7UUFDZCxPQUFBLFlBQUcsRUFBb0IsQ0FBQyxDQUFDLENBQ3ZCLFlBQUcsRUFBd0MsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBQyxFQUFFLEVBQUMsQ0FBQyxDQUNoRTtJQUZELENBRUMsQ0FDRjtBQUpELENBSUMsRUFMOEIsQ0FLOUIsQ0FBQTtBQUVVLFFBQUEsTUFBTSxHQUFHLGNBQVcsT0FBQSxVQUFJLENBQW1DO0lBQ3RFLE9BQUEsaUJBQVMsQ0FBQyxVQUFDLEVBQUk7UUFDYixJQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUMxQixJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxFQUFFO1lBQ3pCLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUE7WUFDM0IsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRTtnQkFDekIsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQTtnQkFDN0IsT0FBTyxlQUFPLEVBQU8sQ0FBSSxRQUFRLENBQUMsQ0FBQTthQUNuQztpQkFBTTtnQkFDTCxJQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFBO2dCQUNuQyxPQUFPLGNBQU0sRUFBTyxDQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUN0RTtTQUNGO2FBQU07WUFDTCxPQUFPLFlBQUcsRUFBb0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQy9DO0lBQ0gsQ0FBQyxDQUFDO0FBZEYsQ0FjRSxFQWY2QixDQWU3QixDQUFBO0FBRVMsUUFBQSxPQUFPLEdBQUcsY0FBVyxPQUFBLFVBQUksQ0FBMkI7SUFDL0QsT0FBQSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUFsQixDQUFrQixFQURjLENBQ2QsQ0FBQTtBQUVQLFFBQUEsTUFBTSxHQUFHLGNBQVksT0FBQSxVQUFNLENBQTZCO0lBQ25FLE9BQUEsYUFBSyxFQUFPLENBQXFCLENBQUMsQ0FBQztTQUNoQyxJQUFJLENBQ0gsVUFBRyxDQUFDLGNBQU0sRUFBTyxDQUFDLENBQ25CO0FBSEgsQ0FHRyxFQUo2QixDQUk3QixDQUFBO0FBRVEsUUFBQSxXQUFXLEdBQUcsVUFBUSxLQUFRO0lBQ3pDLE9BQUEsWUFBRyxFQUFvQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFBaEMsQ0FBZ0MsQ0FBQTtBQUVyQixRQUFBLFlBQVksR0FBRyxVQUFRLENBQUksRUFBRSxDQUFJO0lBQzVDLE9BQUEsWUFBRyxFQUFvQixDQUFDLENBQUMsQ0FDdkIsWUFBRyxFQUF3QyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBQyxDQUFDLEVBQUUsR0FBRyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQy9EO0FBRkQsQ0FFQyxDQUFBO0FBRVUsUUFBQSxrQkFBa0IsR0FBRyxVQUFRLENBQUksRUFBRSxDQUFtQjtJQUNqRSxPQUFBLFlBQUcsRUFBb0IsQ0FBQyxDQUFDLENBQ3ZCLFlBQUcsRUFBd0MsQ0FBQyxDQUFDLENBQUM7UUFDNUMsR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztLQUNQLENBQUMsQ0FDSDtBQUxELENBS0MsQ0FBQTtBQUVVLFFBQUEsUUFBUSxHQUFHLFVBQVEsSUFBc0IsRUFBRSxPQUFpQztJQUN2RixPQUFBLGlCQUFTLENBQUUsVUFBQyxFQUFJO1FBQ2QsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDMUIsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRTtZQUN0QixJQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFBO1lBQ3pCLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxNQUFNLEVBQUU7Z0JBQzFCLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUE7Z0JBQy9CLE9BQU8sWUFBRyxFQUFvQixDQUFDLENBQUMsQ0FDOUIsWUFBRyxFQUF3QyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FDekQsQ0FBQTthQUNGO2lCQUFNO2dCQUNMLElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUE7Z0JBQ3JDLE9BQU8sZ0JBQVEsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ3pFO1NBQ0Y7YUFBTTtZQUNMLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1NBQ3BDO0lBQ0gsQ0FBQyxDQUFDO0FBaEJGLENBZ0JFLENBQUE7QUFFUyxRQUFBLE9BQU8sR0FBRztJQUNyQixPQUFBLGlCQUFTLENBQUMsVUFBQyxFQUFLLElBQUssT0FBQSwwQkFBa0IsQ0FBQyxFQUFFLEVBQUUsY0FBTSxFQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBekMsQ0FBeUMsQ0FBQztBQUEvRCxDQUErRCxDQUFBO0FBRXBELFFBQUEsR0FBRyxHQUFHLFVBQVEsRUFBcUIsRUFBRSxFQUFxQjtJQUNyRSxPQUFBLGlCQUFTLENBQUMsVUFBQyxDQUFHO1FBQ1osY0FBYztRQUNkLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRXRCLGVBQWU7UUFDZixJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUNuRCxJQUFNLGNBQWMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQTtZQUNyQyxPQUFPLFdBQUcsQ0FBQyxFQUFFLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQzdEO1FBRUQsa0JBQWtCO1FBQ2xCLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQyxDQUFDO0FBWkYsQ0FZRSxDQUFBO0FBRVMsUUFBQSxHQUFHLEdBQUcsVUFBVSxFQUFxQixFQUFFLEVBQXFCO0lBQ3ZFLE9BQUEsaUJBQVMsQ0FBQyxVQUFDLEVBQUk7UUFDYixjQUFjO1FBQ2QsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7UUFFdkIseUJBQXlCO1FBQ3pCLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDdEIsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQTtZQUV2QixTQUFTO1lBQ1QsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDMUIsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQTtnQkFFN0Isa0JBQWtCO2dCQUNsQixJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFJLFVBQUMsQ0FBRyxJQUFLLE9BQUEsY0FBTSxFQUFPLENBQUksQ0FBQyxDQUFDLEVBQW5CLENBQW1CLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFFdkUsV0FBVztnQkFDWCxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO29CQUN2QixPQUFPLEVBQUUsQ0FBQTtpQkFDVjtnQkFFRCw2Q0FBNkM7Z0JBQzdDLDBDQUEwQztnQkFDMUMsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFzQixDQUFBO2dCQUVoRCxPQUFPLG9CQUFZLENBQ2pCLFFBQVEsQ0FBQyxHQUFHLEVBQ1osV0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUNqQyxDQUFBO2FBQ0Y7aUJBQU07Z0JBQ0wsZUFBZTtnQkFDZixJQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFBO2dCQUVuQyxtQ0FBbUM7Z0JBQ25DLGlDQUFpQztnQkFDakMsSUFBTSxZQUFZLEdBQUcsYUFBSyxFQUFPLENBQUMsVUFBRyxDQUFzQixVQUFDLENBQVksSUFBSyxPQUFBLENBQUMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQTFCLENBQTBCLENBQUMsQ0FBQyxDQUFBO2dCQUV6RyxPQUFPLFlBQVksQ0FBQyxDQUFDLENBQ25CLFdBQUcsQ0FBVSxFQUFFLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUNyQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUUzQixrQkFBa0I7Z0JBQ2xCLDhDQUE4QztnQkFDOUMsc0dBQXNHO2dCQUN0RywrQkFBK0I7YUFDaEM7U0FDRjthQUFNO1lBQ0wsUUFBUTtZQUNSLE9BQU8sRUFBRSxDQUFBO1NBQ1Y7SUFDSCxDQUFDLENBQUM7QUFqREYsQ0FpREUsQ0FBQTtBQUVKLElBQU0sV0FBVyxHQUFHLFVBQVEsU0FBOEIsRUFBRSxHQUFzQjtJQUNoRixPQUFBLGlCQUFTLENBQUUsVUFBQyxFQUFJO1FBQ2QsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDekIsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRTtZQUN0QixJQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFBO1lBQ3pCLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxNQUFNLEVBQUU7Z0JBQzFCLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUE7Z0JBQy9CLGlDQUFpQztnQkFDakMsT0FBTyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDekY7aUJBQU07Z0JBQ0wsNkJBQTZCO2dCQUM3QixJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFBO2dCQUNyQyxPQUFPLFdBQVcsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQzlFO1NBQ0Y7YUFBTTtZQUNMLFFBQVE7WUFDUixPQUFPLEdBQUcsQ0FBQTtTQUNYO0lBQ0gsQ0FBQyxDQUFDO0FBakJGLENBaUJFLENBQUE7QUFHSixJQUFNLEdBQUcsR0FBRyxVQUFNLENBQWdCO0lBQ2hDLE9BQUEsaUJBQVMsQ0FBVyxVQUFBLENBQUMsSUFBSSxPQUFBLG9CQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUF0QixDQUFzQixDQUFDO0FBQWhELENBQWdELENBQUE7QUFJbEQsSUFBTSxJQUFJLEdBQUcsVUFBdUIsR0FBWTtJQUM5QyxPQUFBLGlCQUFTLENBQVcsVUFBQSxFQUFFLElBQUksT0FBQSxvQkFBWSx1QkFBSyxFQUFFLEtBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxJQUFJLEtBQUcsRUFBRSxDQUFDLEVBQTNDLENBQTJDLENBQUM7U0FDbkUsSUFBSSxDQUFRLFVBQUMsQ0FBTyxJQUFLLE9BQUEsU0FBUyxFQUFFLEVBQVgsQ0FBVyxDQUFDO0FBRHhDLENBQ3dDLENBQUE7QUFFMUMsSUFBTSxTQUFTLEdBQUc7SUFDaEIsT0FBQSxpQkFBUyxDQUFDLFVBQUMsQ0FBRztRQUNaLE9BQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsb0JBQVksdUJBQUssQ0FBQyxLQUFFLElBQUksRUFBRSxDQUFDLEtBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLDBCQUFrQixDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUEvRixDQUErRixDQUNoRztBQUZELENBRUMsQ0FBQTtBQUdILElBQU0sZUFBZSxHQUFxQixFQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFBO0FBRS9ELDhCQUE4QjtBQUM5QixXQUFXLENBQWdDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLEVBQWQsQ0FBYyxFQUM1RCxJQUFJLENBQXlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNuQyxPQUFBLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLHVCQUFLLENBQUMsS0FBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBQyxDQUFDLElBQUUsRUFBN0IsQ0FBNkIsQ0FBQztBQUF2QyxDQUF1QyxDQUN4QyxDQUNGLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQSJ9