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
var lib_1 = require("../lib");
function default_1() {
    // Trying out the state
    console.log('\n --- state sample');
    var getVar = function () { return function (k) {
        return lib_1.State(function (s0) {
            console.log('Get:', k, s0[k]);
            return { fst: s0[k], snd: s0 };
        });
    }; };
    var setVar = function () { return function (k) { return function (newValue) {
        return lib_1.State(function (s0) {
            var _a;
            console.log('Set:', k, s0[k]);
            return { fst: {}, snd: __assign({}, s0, (_a = {}, _a[k] = newValue, _a)) };
        });
    }; }; };
    var incrVar = function () { return function (k) {
        return getVar()(k).bind(function (v) {
            return lib_1.State(function (s0) {
                var _a;
                if (typeof s0[k] == "number" && typeof v === "number") {
                    return { fst: {}, snd: __assign({}, s0, (_a = {}, _a[k] = v + 1, _a)) };
                }
                else {
                    return { fst: {}, snd: s0 };
                }
            });
        });
    }; };
    var decrVar = function () { return function (k) {
        return getVar()(k).bind(function (v) {
            return lib_1.State(function (s0) {
                var _a;
                if (typeof s0[k] == "number" && typeof v === "number") {
                    return { fst: {}, snd: __assign({}, s0, (_a = {}, _a[k] = v - 1, _a)) };
                }
                else {
                    return { fst: {}, snd: s0 };
                }
            });
        });
    }; };
    var seq = function (current, next) { return current.bind(function (_) { return next; }); };
    var skip = function () { return lib_1.unitState().f({}); };
    var ifThenElse = function () { return function (condition, _then, _else) {
        return condition.bind(function (b) { return b ? _then : _else; });
    }; };
    var _while = function (condition, body) {
        return condition.bind(function (b) { return b ? body.bind(function (_) { return _while(condition, body); }) : lib_1.unitState().f({}); });
    };
    var myGetVar = getVar();
    var mySetVar = setVar();
    var myHelloWorld = myGetVar("x").bind(function (x) {
        return myGetVar("y").bind(function (y) {
            return mySetVar("x")(x + y).bind(function (_) {
                return mySetVar("y")(y * x).bind(function (_) {
                    return myGetVar("x").bind(function (_) {
                        return myGetVar("y").bind(function (_) {
                            return mySetVar("x")(x + y);
                        });
                    });
                });
            });
        });
    });
    var swap = myGetVar("x").bind(function (x) {
        return myGetVar("y").bind(function (y) {
            return mySetVar("x")(y).bind(function (_) {
                return mySetVar("y")(x);
            });
        });
    });
    myHelloWorld.f({ x: 3, y: 8 });
    swap.f({ x: 3, y: 8 });
    return {};
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtc2FtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2FtcGxlcy9zdGF0ZS1zYW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLDhCQUE4QztBQUU5QztJQUNFLHVCQUF1QjtJQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUE7SUFPbEMsSUFBTSxNQUFNLEdBQUcsY0FBUyxPQUFBLFVBQW9CLENBQUc7UUFDN0MsT0FBQSxXQUFLLENBQUMsVUFBQyxFQUFFO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzdCLE9BQU8sRUFBRSxHQUFHLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBQyxFQUFFLEVBQUUsQ0FBQTtRQUM5QixDQUFDLENBQUM7SUFIRixDQUdFLEVBSm9CLENBSXBCLENBQUE7SUFFSixJQUFNLE1BQU0sR0FBRyxjQUFTLE9BQUEsVUFBb0IsQ0FBRyxJQUFLLE9BQUEsVUFBQyxRQUFlO1FBQ2xFLE9BQUEsV0FBSyxDQUFDLFVBQUMsRUFBRTs7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDN0IsT0FBTyxFQUFFLEdBQUcsRUFBQyxFQUFFLEVBQUUsR0FBRyxlQUFLLEVBQUUsZUFBRyxDQUFDLElBQUUsUUFBUSxNQUFDLEVBQUUsQ0FBQTtRQUM5QyxDQUFDLENBQUM7SUFIRixDQUdFLEVBSmdELENBSWhELEVBSm9CLENBSXBCLENBQUE7SUFFSixJQUFNLE9BQU8sR0FBRyxjQUFTLE9BQUEsVUFBb0IsQ0FBSTtRQUMvQyxPQUFBLE1BQU0sRUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQVE7WUFDM0IsT0FBQSxXQUFL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