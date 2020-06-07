"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPair = exports.Pair = void 0;
var core_1 = require("./core");
exports.Pair = function (fst, snd) { return ({ fst: fst, snd: snd }); };
exports.mapPair = function (f, g) {
    return core_1.Fun(function (p) { return exports.Pair(f.f(p.fst), g.f(p.snd)); });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9wYWlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUE0QjtBQUlmLFFBQUEsSUFBSSxHQUFHLFVBQU8sR0FBTSxFQUFFLEdBQU0sSUFBaUIsT0FBQSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQTtBQUVyRSxRQUFBLE9BQU8sR0FBRyxVQUFhLENBQVksRUFBRSxDQUFZO0lBQzVELE9BQU8sVUFBRyxDQUFDLFVBQUMsQ0FBYSxJQUFLLE9BQUEsWUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQTtBQUM3RCxDQUFDLENBQUEifQ==