"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setState = exports.getState = exports.apply = exports.bindState = exports.joinState = exports.mapState = exports.unitState = void 0;
var core_1 = require("./core");
var pair_1 = require("./pair");
exports.unitState = function () {
    return core_1.Fun(function (a) { return core_1.Fun(function (s) { return ({ fst: s, snd: a }); }); });
};
exports.mapState = function (f) {
    return core_1.Fun(function (s) { return s.then(pair_1.mapPair(core_1.id(), f)); });
};
exports.joinState = function () {
    return core_1.Fun(function (ss) { return ss.then(exports.apply()); });
};
exports.bindState = function (state, k) {
    return exports.mapState(k).then(exports.joinState()).f(state);
};
exports.apply = function () {
    return core_1.Fun(function (fa) { return fa.snd.f(fa.fst); });
};
exports.getState = function () {
    return core_1.Fun(function (s) { return ({ fst: s, snd: s }); });
};
exports.setState = function (s) {
    return core_1.Fun(function (_) { return ({ fst: s, snd: {} }); });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQXNDO0FBQ3RDLCtCQUFzQztBQU16QixRQUFBLFNBQVMsR0FBRztJQUN2QixPQUFBLFVBQUcsQ0FBQyxVQUFDLENBQUksSUFBSyxPQUFBLFVBQUcsQ0FBQyxVQUFDLENBQUksSUFBSyxPQUFBLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFwQixDQUFvQixDQUFDLEVBQW5DLENBQW1DLENBQUM7QUFBbEQsQ0FBa0QsQ0FBQTtBQUV2QyxRQUFBLFFBQVEsR0FBRyxVQUFVLENBQVk7SUFDNUMsT0FBQSxVQUFHLENBQTJCLFVBQUMsQ0FBYyxJQUFLLE9BQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFPLENBQUMsU0FBRSxFQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQztBQUE5RSxDQUE4RSxDQUFBO0FBRW5FLFFBQUEsU0FBUyxHQUFHO0lBQ3ZCLE9BQUEsVUFBRyxDQUFDLFVBQUMsRUFBeUIsSUFBa0IsT0FBQSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQUssRUFBRSxDQUFDLEVBQWhCLENBQWdCLENBQUM7QUFBakUsQ0FBaUUsQ0FBQTtBQUV0RCxRQUFBLFNBQVMsR0FBRyxVQUFVLEtBQWtCLEVBQUUsQ0FBc0I7SUFDM0UsT0FBQSxnQkFBUSxDQUFvQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUF6RCxDQUF5RCxDQUFBO0FBRTlDLFFBQUEsS0FBSyxHQUFHO0lBQ25CLE9BQUEsVUFBRyxDQUFDLFVBQUMsRUFBcUIsSUFBSyxPQUFBLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQztBQUFoRCxDQUFnRCxDQUFBO0FBRXJDLFFBQUEsUUFBUSxHQUFHO0lBQ3RCLE9BQUEsVUFBRyxDQUFDLFVBQUMsQ0FBSSxJQUFLLE9BQUEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQXBCLENBQW9CLENBQUM7QUFBbkMsQ0FBbUMsQ0FBQTtBQUV4QixRQUFBLFFBQVEsR0FBRyxVQUFJLENBQUk7SUFDOUIsT0FBQSxVQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBckIsQ0FBcUIsQ0FBQztBQUEvQixDQUErQixDQUFBIn0=