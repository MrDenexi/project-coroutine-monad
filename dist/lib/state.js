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
exports.repeatState = exports.setState = exports.getState = exports.apply = exports.bindState = exports.joinState = exports.mapState = exports.unitState = exports.State = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBc0M7QUFDdEMsK0JBQXNDO0FBT3pCLFFBQUEsS0FBSyxHQUFHLFVBQU0sQ0FBd0IsSUFBa0IsT0FBQSx1QkFDaEUsVUFBRyxDQUFDLENBQUMsQ0FBQyxLQUNULElBQUksRUFBRSxVQUE4QixDQUFzQjtRQUN4RCxPQUFPLGlCQUFTLENBQUMsSUFBSSxFQUFFLFVBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2hDLENBQUMsRUFDRCxLQUFLLEVBQUUsVUFBOEIsQ0FBb0I7UUFDdkQsT0FBTyxpQkFBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUMzQixDQUFDLElBQ0QsRUFSbUUsQ0FRbkUsQ0FBQTtBQUVXLFFBQUEsU0FBUyxHQUFHO0lBQ3ZCLE9BQUEsVUFBRyxDQUFDLFVBQUMsQ0FBSSxJQUFLLE9BQUEsYUFBSyxDQUFDLFVBQUMsQ0FBSSxJQUFLLE9BQUEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQXBCLENBQW9CLENBQUMsRUFBckMsQ0FBcUMsQ0FBQztBQUFwRCxDQUFvRCxDQUFBO0FBRXpDLFFBQUEsUUFBUSxHQUFHLFVBQVUsQ0FBWTtJQUM1QyxPQUFBLFVBQUcsQ0FDRCxVQUFDLENBQWMsSUFBSyxPQUFBLGFBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQU8sQ0FBQyxDQUFDLEVBQUUsU0FBRSxFQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFwQyxDQUFvQyxDQUN6RDtBQUZELENBRUMsQ0FBQTtBQUVVLFFBQUEsU0FBUyxHQUFHO0lBQ3ZCLE9BQUEsVUFBRyxDQUNELFVBQUMsRUFBeUIsSUFBSyxPQUFBLGFBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQXpCLENBQXlCLENBQ3pEO0FBRkQsQ0FFQyxDQUFBO0FBRVUsUUFBQSxTQUFTLEdBQUcsVUFBVSxLQUFrQixFQUFFLENBQXNCO0lBQzNFLE9BQUEsZ0JBQVEsQ0FBb0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFBekQsQ0FBeUQsQ0FBQTtBQUU5QyxRQUFBLEtBQUssR0FBRztJQUNuQixPQUFBLFVBQUcsQ0FBQyxVQUFDLEVBQXVCLElBQUssT0FBQSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQWhCLENBQWdCLENBQUM7QUFBbEQsQ0FBa0QsQ0FBQTtBQUV2QyxRQUFBLFFBQVEsR0FBRztJQUN0QixPQUFBLGFBQUssQ0FBQyxVQUFDLENBQUksSUFBSyxPQUFBLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFuQixDQUFtQixDQUFDO0FBQXBDLENBQW9DLENBQUE7QUFFekIsUUFBQSxRQUFRLEdBQUcsVUFBSSxDQUFJO0lBQzlCLE9BQUEsYUFBSyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQXJCLENBQXFCLENBQUM7QUFBakMsQ0FBaUMsQ0FBQTtBQUV0QixRQUFBLFdBQVcsR0FBRyxVQUFNLENBQVEsRUFBRSxDQUFxQjtJQUM5RCxPQUFBLFVBQUMsQ0FBSTtRQUNILE9BQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ04saUJBQVMsRUFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxtQkFBVyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQXRCLENBQXNCLENBQUM7SUFGeEMsQ0FFd0M7QUFIMUMsQ0FHMEMsQ0FBQSJ9