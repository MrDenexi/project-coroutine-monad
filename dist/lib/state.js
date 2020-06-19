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
exports.State = function (f) { return (__assign({}, core_1.Fun(f), { bind: function (k) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUFzQztBQUN0QywrQkFBc0M7QUFPekIsUUFBQSxLQUFLLEdBQUcsVUFBTSxDQUF3QixJQUFrQixPQUFBLGNBQ2hFLFVBQUcsQ0FBQyxDQUFDLENBQUMsSUFDVCxJQUFJLEVBQUUsVUFBOEIsQ0FBc0I7UUFDeEQsT0FBTyxpQkFBUyxDQUFDLElBQUksRUFBRSxVQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNoQyxDQUFDLEVBQ0QsS0FBSyxFQUFFLFVBQThCLENBQW9CO1FBQ3ZELE9BQU8saUJBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDM0IsQ0FBQyxJQUNELEVBUm1FLENBUW5FLENBQUE7QUFFVyxRQUFBLFNBQVMsR0FBRztJQUN2QixPQUFBLFVBQUcsQ0FBQyxVQUFDLENBQUksSUFBSyxPQUFBLGFBQUssQ0FBQyxVQUFDLENBQUksSUFBSyxPQUFBLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFwQixDQUFvQixDQUFDLEVBQXJDLENBQXFDLENBQUM7QUFBcEQsQ0FBb0QsQ0FBQTtBQUV6QyxRQUFBLFFBQVEsR0FBRyxVQUFVLENBQVk7SUFDNUMsT0FBQSxVQUFHLENBQ0QsVUFBQyxDQUFjLElBQUssT0FBQSxhQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFPLENBQUMsQ0FBQyxFQUFFLFNBQUUsRUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBcEMsQ0FBb0MsQ0FDekQ7QUFGRCxDQUVDLENBQUE7QUFFVSxRQUFBLFNBQVMsR0FBRztJQUN2QixPQUFBLFVBQUcsQ0FDRCxVQUFDLEVBQXlCLElBQUssT0FBQSxhQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUF6QixDQUF5QixDQUN6RDtBQUZELENBRUMsQ0FBQTtBQUVVLFFBQUEsU0FBUyxHQUFHLFVBQVUsS0FBa0IsRUFBRSxDQUFzQjtJQUMzRSxPQUFBLGdCQUFRLENBQW9CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQXpELENBQXlELENBQUE7QUFFOUMsUUFBQSxLQUFLLEdBQUc7SUFDbkIsT0FBQSxVQUFHLENBQUMsVUFBQyxFQUF1QixJQUFLLE9BQUEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFoQixDQUFnQixDQUFDO0FBQWxELENBQWtELENBQUE7QUFFdkMsUUFBQSxRQUFRLEdBQUc7SUFDdEIsT0FBQSxhQUFLLENBQUMsVUFBQyxDQUFJLElBQUssT0FBQSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBbkIsQ0FBbUIsQ0FBQztBQUFwQyxDQUFvQyxDQUFBO0FBRXpCLFFBQUEsUUFBUSxHQUFHLFVBQUksQ0FBSTtJQUM5QixPQUFBLGFBQUssQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFyQixDQUFxQixDQUFDO0FBQWpDLENBQWlDLENBQUE7QUFFdEIsUUFBQSxXQUFXLEdBQUcsVUFBTSxDQUFRLEVBQUUsQ0FBcUI7SUFDOUQsT0FBQSxVQUFDLENBQUk7UUFDSCxPQUFBLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNOLGlCQUFTLEVBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsbUJBQVcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUF0QixDQUFzQixDQUFDO0lBRnhDLENBRXdDO0FBSDFDLENBRzBDLENBQUEifQ==