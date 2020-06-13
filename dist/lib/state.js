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
var pair_1 = require("./pair");
exports.State = function (f) { return (__assign(__assign({}, core_1.Fun(f)), { bind: function (k) {
        return exports.bindState(this, core_1.Fun(k));
    }, bindF: function (k) {
        return exports.bindState(this, k);
    } })); };
exports.unitState = function () {
    return core_1.Fun(function (a) { return exports.State(function (s) { return ({ fst: a, snd: s }); }); });
};
exports.mapState = function (f) {
    return core_1.Fun(function (s) { return exports.State(s.then(pair_1.mapPair(f, core_1.id())).f); });
};
exports.joinState = function () {
    return core_1.Fun(function (ss) { return exports.State(ss.then(exports.apply()).f); });
};
exports.bindState = function (state, k) {
    return exports.mapState(k).then(exports.joinState()).f(state);
};
exports.apply = function () {
    return core_1.Fun(function (fa) { return fa.fst.f(fa.snd); });
};
exports.getState = function () {
    return exports.State(function (s) { return ({ fst: s, snd: s }); });
};
exports.setState = function (s) {
    return exports.State(function (_) { return ({ fst: {}, snd: s }); });
};
exports.repeatState = function (n, f) {
    return function (a) {
        return n == 0 ?
            exports.unitState().f(a) :
            f(a).bind(function (a) { return exports.repeatState(n - 1, f)(a); });
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUFzQztBQUN0QywrQkFBc0M7QUFPekIsUUFBQSxLQUFLLEdBQUcsVUFBTSxDQUF3QixJQUFrQixPQUFBLHVCQUNoRSxVQUFHLENBQUMsQ0FBQyxDQUFDLEtBQ1QsSUFBSSxFQUFFLFVBQThCLENBQXNCO1FBQ3hELE9BQU8saUJBQVMsQ0FBQyxJQUFJLEVBQUUsVUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDaEMsQ0FBQyxFQUNELEtBQUssRUFBRSxVQUE4QixDQUFvQjtRQUN2RCxPQUFPLGlCQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQzNCLENBQUMsSUFDRCxFQVJtRSxDQVFuRSxDQUFBO0FBRVcsUUFBQSxTQUFTLEdBQUc7SUFDdkIsT0FBQSxVQUFHLENBQUMsVUFBQyxDQUFJLElBQUssT0FBQSxhQUFLLENBQUMsVUFBQyxDQUFJLElBQUssT0FBQSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBcEIsQ0FBb0IsQ0FBQyxFQUFyQyxDQUFxQyxDQUFDO0FBQXBELENBQW9ELENBQUE7QUFFekMsUUFBQSxRQUFRLEdBQUcsVUFBVSxDQUFZO0lBQzVDLE9BQUEsVUFBRyxDQUNELFVBQUMsQ0FBYyxJQUFLLE9BQUEsYUFBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBTyxDQUFDLENBQUMsRUFBRSxTQUFFLEVBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQXBDLENBQW9DLENBQ3pEO0FBRkQsQ0FFQyxDQUFBO0FBRVUsUUFBQSxTQUFTLEdBQUc7SUFDdkIsT0FBQSxVQUFHLENBQ0QsVUFBQyxFQUF5QixJQUFLLE9BQUEsYUFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBekIsQ0FBeUIsQ0FDekQ7QUFGRCxDQUVDLENBQUE7QUFFVSxRQUFBLFNBQVMsR0FBRyxVQUFVLEtBQWtCLEVBQUUsQ0FBc0I7SUFDM0UsT0FBQSxnQkFBUSxDQUFvQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUF6RCxDQUF5RCxDQUFBO0FBRTlDLFFBQUEsS0FBSyxHQUFHO0lBQ25CLE9BQUEsVUFBRyxDQUFDLFVBQUMsRUFBdUIsSUFBSyxPQUFBLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQztBQUFsRCxDQUFrRCxDQUFBO0FBRXZDLFFBQUEsUUFBUSxHQUFHO0lBQ3RCLE9BQUEsYUFBSyxDQUFDLFVBQUMsQ0FBSSxJQUFLLE9BQUEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQW5CLENBQW1CLENBQUM7QUFBcEMsQ0FBb0MsQ0FBQTtBQUV6QixRQUFBLFFBQVEsR0FBRyxVQUFJLENBQUk7SUFDOUIsT0FBQSxhQUFLLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBckIsQ0FBcUIsQ0FBQztBQUFqQyxDQUFpQyxDQUFBO0FBRXRCLFFBQUEsV0FBVyxHQUFHLFVBQU0sQ0FBUSxFQUFFLENBQXFCO0lBQzlELE9BQUEsVUFBQyxDQUFJO1FBQ0gsT0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDTixpQkFBUyxFQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLG1CQUFXLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQztJQUZ4QyxDQUV3QztBQUgxQyxDQUcwQyxDQUFBIn0=