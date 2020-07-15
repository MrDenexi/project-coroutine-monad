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
    suspend: function (f) {
        var _this = this;
        return exports.Coroutine(function (s1) { return exports.coStepContinuation(s1, _this.bind(f)); });
    },
    suspendF: function (f) {
        var _this = this;
        return exports.Coroutine(function (s1) { return exports.coStepContinuation(s1, _this.bindF(f)); });
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
                // --- 📝📝 official agreement 📝📝 ---
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
exports.repeatUntil = function (predicate, cor) {
    return exports.Coroutine(function (s0) {
        var ran = cor.fun.f(s0);
        if (ran.kind == "left") {
            var ranLeft = ran.value;
            if (ranLeft.kind == "left") {
                var ranResult = ranLeft.value;
                // return result or repeat result
                return predicate(ranResult.snd) ? ran : exports.repeatUntil(predicate, cor).fun.f(ranResult.snd);
            }
            else {
                // repeat continuation always
                var ranContinuation = ranLeft.value;
                return exports.repeatUntil(predicate, ranContinuation.fst).fun.f(ranContinuation.snd);
            }
        }
        else {
            // error
            return ran;
        }
    });
};
exports._do = function (f) {
    return exports.Coroutine(function (s) { return exports.coStepResult(f(s), {}); });
};
exports.wait = function (sec) {
    console.log('start wait');
    return exports.Coroutine(function (s0) { return exports.coStepResult(__assign(__assign({}, s0), { wait: (Date.now() + sec * 1000) }), {}); })
        .bind(function (_) { return exports.checkWait(); });
};
// helper function for wait
exports.checkWait = function () {
    return exports.Coroutine(function (s) {
        var now = Date.now();
        console.log('--- checkwait');
        console.log('time now:', now / 1000);
        console.log('time in state:', s['wait'] / 1000);
        if (s['wait'] < Date.now()) {
            console.log('result:', s);
            return exports.coStepResult(__assign(__assign({}, s), { wait: 0 }), {});
        }
        else {
            console.log('continuation:');
            // eslint-disable-next-line functional/no-let
            var i = 0;
            // eslint-disable-next-line functional/no-loop-statement
            while (i < 100) {
                i = Date.now() - now;
            }
            return exports.coStepContinuation(s, exports.checkWait());
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yb3V0aW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2Nvcm91dGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQXlDO0FBQ3pDLG1DQUFzRDtBQUN0RCwrQkFBc0M7QUFnQ3pCLFFBQUEsU0FBUyxHQUFHLFVBQVEsQ0FBMEIsSUFBd0IsT0FBQSxDQUFDO0lBQ2xGLEdBQUcsRUFBRSxVQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ1gsSUFBSSxFQUFFLFVBQXFDLENBQTJCO1FBQ3BFLE9BQU8sY0FBTSxFQUFPLENBQUMsVUFBRyxDQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxRCxDQUFDO0lBQ0QsS0FBSyxFQUFFLFVBQW9DLENBQTBCO1FBQ25FLE9BQU8sY0FBTSxFQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2pDLENBQUM7SUFDRCxPQUFPLEVBQUUsVUFBb0MsQ0FBMkI7UUFBL0QsaUJBRVI7UUFEQyxPQUFPLGlCQUFTLENBQUMsVUFBQyxFQUFJLElBQUssT0FBQSwwQkFBa0IsQ0FBQyxFQUFFLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFwQyxDQUFvQyxDQUFDLENBQUE7SUFDbEUsQ0FBQztJQUNELFFBQVEsRUFBRSxVQUFvQyxDQUEwQjtRQUE5RCxpQkFFVDtRQURDLE9BQU8saUJBQVMsQ0FBQyxVQUFDLEVBQUksSUFBSyxPQUFBLDBCQUFrQixDQUFDLEVBQUUsRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQXJDLENBQXFDLENBQUMsQ0FBQTtJQUNuRSxDQUFDO0lBQ0QsVUFBVSxFQUFFLFVBQWlDLEdBQXFCO1FBQ2hFLE9BQU8sV0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBQ0Qs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