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
            return { fst: {}, snd: __assign(__assign({}, s0), (_a = {}, _a[k] = newValue, _a)) };
        });
    }; }; };
    var incrVar = function () { return function (k) {
        return getVar()(k).bind(function (v) {
            return lib_1.State(function (s0) {
                var _a;
                if (typeof s0[k] == "number" && typeof v === "number") {
                    return { fst: {}, snd: __assign(__assign({}, s0), (_a = {}, _a[k] = v + 1, _a)) };
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
                    return { fst: {}, snd: __assign(__assign({}, s0), (_a = {}, _a[k] = v - 1, _a)) };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zYW1wbGVzL3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSw4QkFBOEM7QUFFOUM7SUFDRSx1QkFBdUI7SUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0lBT2xDLElBQU0sTUFBTSxHQUFHLGNBQVMsT0FBQSxVQUFvQixDQUFHO1FBQzdDLE9BQUEsV0FBSyxDQUFDLFVBQUMsRUFBRTtZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUM3QixPQUFPLEVBQUUsR0FBRyxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUMsRUFBRSxFQUFFLENBQUE7UUFDOUIsQ0FBQyxDQUFDO0lBSEYsQ0FHRSxFQUpvQixDQUlwQixDQUFBO0lBRUosSUFBTSxNQUFNLEdBQUcsY0FBUyxPQUFBLFVBQW9CLENBQUcsSUFBSyxPQUFBLFVBQUMsUUFBZTtRQUNsRSxPQUFBLFdBQUssQ0FBQyxVQUFDLEVBQUU7O1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzdCLE9BQU8sRUFBRSxHQUFHLEVBQUMsRUFBRSxFQUFFLEdBQUcsd0JBQUssRUFBRSxnQkFBRyxDQUFDLElBQUUsUUFBUSxNQUFDLEVBQUUsQ0FBQTtRQUM5QyxDQUFDLENBQUM7SUFIRixDQUdFLEVBSmdELENBSWhELEVBSm9CLENBSXBCLENBQUE7SUFFSixJQUFNLE9BQU8sR0FBRyxjQUFTLE9BQUEsVUFBb0IsQ0FBSTtRQUMvQyxPQUFBLE1BQU0sRUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQVE7WUFDM0IsT0FBQSxXQUFLLENBQVUsVUFBQyxF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