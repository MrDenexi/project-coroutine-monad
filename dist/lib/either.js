"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapEither = exports.joinEither = exports.unitEither = exports.inr = exports.inl = void 0;
var core_1 = require("./core");
exports.inl = function () {
    return core_1.Fun(function (x) { return ({
        kind: "left",
        value: x
    }); });
};
exports.inr = function () {
    return core_1.Fun(function (x) { return ({
        kind: "right",
        value: x
    }); });
};
exports.unitEither = function () { return exports.inr(); };
exports.joinEither = function () {
    return core_1.Fun(function (x) { return x.kind == "left" ? exports.inl().f(x.value)
        : x.value; });
};
exports.mapEither = function (f, g) {
    return core_1.Fun(function (e) {
        if (e.kind == "left") {
            var newValue_1 = f.f(e.value);
            return exports.inl().f(newValue_1);
        }
        var newValue = g.f(e.value);
        return exports.inr().f(newValue);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWl0aGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2VpdGhlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBNEI7QUFVZixRQUFBLEdBQUcsR0FBRztJQUNqQixPQUFPLFVBQUcsQ0FBQyxVQUFDLENBQUksSUFBbUIsT0FBQSxDQUFDO1FBQ2xDLElBQUksRUFBRSxNQUFNO1FBQ1osS0FBSyxFQUFFLENBQUM7S0FDVCxDQUFDLEVBSGlDLENBR2pDLENBQUMsQ0FBQTtBQUNMLENBQUMsQ0FBQTtBQUVZLFFBQUEsR0FBRyxHQUFHO0lBQ2pCLE9BQU8sVUFBRyxDQUFDLFVBQUMsQ0FBSSxJQUFtQixPQUFBLENBQUM7UUFDbEMsSUFBSSxFQUFFLE9BQU87UUFDYixLQUFLLEVBQUUsQ0FBQztLQUNULENBQUMsRUFIaUMsQ0FHakMsQ0FBQyxDQUFBO0FBQ0wsQ0FBQyxDQUFBO0FBRVksUUFBQSxVQUFVLEdBQUcsY0FBa0MsT0FBQSxXQUFHLEVBQVEsRUFBWCxDQUFXLENBQUE7QUFFMUQsUUFBQSxVQUFVLEdBQUc7SUFDeEIsT0FBQSxVQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBRyxFQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBREYsQ0FDRSxDQUFDO0FBRFosQ0FDWSxDQUFBO0FBRUQsUUFBQSxTQUFTLEdBQUcsVUFBZSxDQUFhLEVBQUUsQ0FBYTtJQUNsRSxPQUFPLFVBQUcsQ0FBK0IsVUFBQyxDQUFlO1FBQ3ZELElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxNQUFNLEVBQUU7WUFDcEIsSUFBTSxVQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDN0IsT0FBTyxXQUFHLEVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBUSxDQUFDLENBQUE7U0FDakM7UUFFRCxJQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM3QixPQUFPLFdBQUcsRUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNsQyxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQSJ9