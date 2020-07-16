"use strict";
// import { id, None } from "./lib"
// import stateSample from "./samples/state-sample"
// import renderSample from "./samples/renderer"
// import { myCoroutineResult } from "./samples/coroutine-sample"
// import { myCoroutineResult } from "./samples/coroutine-project-description"
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
var lib_1 = require("./lib");
var safeGetVar = function (k) {
    return lib_1.Coroutine(function (m0) {
        if (m0.has(k)) {
            console.log('safeGetVar', k, m0.get(k));
            return lib_1.coStepResult(m0, m0.get(k));
        }
        else {
            console.error('safeGetVar error:', k);
            return lib_1.coStepError("not found");
        }
    });
};
var setVar = function (k, value) {
    console.log('setVar', k, value);
    return lib_1.Coroutine(function (m0) { return lib_1.coStepResult(m0.set(k, value), {}); });
};
var forceGetVar = function (k, fallbackValue) {
    console.log('forcegetVar', k, fallbackValue);
    return lib_1.tryCatch(safeGetVar(k), function (_) { return lib_1.Coroutine(function (m0) {
        console.error('forcegetVar error, force it!');
        return lib_1.coStepResult(m0.set(k, fallbackValue), fallbackValue);
    }); });
};
var coOne = lib_1.unitCo()({})
    .bind(function (_) { return setVar('x', 23)
    .bind(function (_) { return setVar('y', 999)
    .bind(function (_) { return safeGetVar('x')
    .bind(function (_) { return forceGetVar('q', 12890); }); }); }); });
var coTwo = lib_1.unitCo()({})
    .bind(function (_) { return setVar('a', 11)
    .bind(function (_) { return setVar('b', 12)
    .bind(function (_) { return safeGetVar('a')
    .bind(function (_) { return forceGetVar('c', 99999); }); }); }); });
// const resultOne = coOne.fun.f(Map())
// console.log(resultOne)
// const resultTwo = coTwo.fun.f(Map())
// console.log(resultTwo)
var coSuspendOne = lib_1.unitCo()({})
    .suspend(function (_) { return setVar('a', 11)
    .suspend(function (_) { return setVar('b', 13)
    .suspend(function (_) { return safeGetVar('a')
    .suspend(function (_) { return forceGetVar('c', 99)
    .suspend(function (_) { return setVar('d', 15)
    .suspend(function (_) { return safeGetVar('b')
    .suspend(function (_) { return safeGetVar('d'); }); } // is 15
); }); }); }); }); });
var coSuspendTwo = lib_1.unitCo()({})
    .suspend(function (_) { return setVar('a', 2)
    .suspend(function (_) { return setVar('b', 30)
    .suspend(function (_) { return safeGetVar('a')
    .suspend(function (_) { return forceGetVar('c', 44); }); }); }); });
// const resultSuspendOne = coSuspendOne.fun.f(Map())
// console.log(resultSuspendOne)
// const resultSuspendTwo = coSuspendTwo.fun.f(Map())
// console.log(resultSuspendTwo)
// const allOneTwo = all(coSuspendOne, coSuspendTwo).fun.f(Map())
// console.log(allOneTwo)
// console.log(allOneTwo.value)
// const parallelOneTwo = coSuspendOne.parallel(coSuspendTwo).fun.f(Map())
// console.log(parallelOneTwo)
// console.log(parallelOneTwo.value)
// const anyOneTwo = any(coSuspendOne, coSuspendTwo).fun.f(Map())
// console.log(anyOneTwo)
// const concurrentOneTwo = coSuspendOne.concurrent(coSuspendTwo).fun.f(Map())
// console.log(concurrentOneTwo)
var lib_2 = require("./lib");
var waitableCounter = { wait: 0, Counter: 0 };
exports.example = function () {
    return lib_2.repeatUntil(function (s) { return s.Counter > 6; }, lib_2.wait(3).bind(function () {
        return lib_2._do(function (s) { return (__assign(__assign({}, s), { Counter: s.Counter + 1 })); });
    })).fun.f(waitableCounter);
};
// console.log(example())
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG1DQUFtQztBQUNuQyxtREFBbUQ7QUFDbkQsZ0RBQWdEO0FBQ2hELGlFQUFpRTtBQUNqRSw4RUFBOEU7Ozs7Ozs7Ozs7Ozs7QUFHOUUsNkJBQW1IO0FBT25ILElBQU0sVUFBVSxHQUFHLFVBQUMsQ0FBVTtJQUM1QixPQUFBLGVBQVMsQ0FBRSxVQUFDLEVBQVM7UUFDbkIsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN2QyxPQUFPLGtCQUFZLENBQXdCLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7U0FDcEU7YUFBTTtZQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDckMsT0FBTyxpQkFBVyxDQUF3QixXQUFXLENBQUMsQ0FBQTtTQUN2RDtJQUNILENBQUMsQ0FBQztBQVJGLENBUUUsQ0FBQTtBQUVKLElBQU0sTUFBTSxHQUFHLFVBQUMsQ0FBUyxFQUFFLEtBQWE7SUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQy9CLE9BQU8sZUFBUyxDQUFFLFVBQUMsRUFBUyxJQUFLLE9BQUEsa0JBQVksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFBO0FBQ3RFLENBQUMsQ0FBQTtBQUVELElBQU0sV0FBVyxHQUFHLFVBQUMsQ0FBUyxFQUFFLGFBQXNCO0lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMs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