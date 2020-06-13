"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.collapseEither = function (x) { return x.value; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWl0aGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2VpdGhlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUE0QjtBQVVmLFFBQUEsR0FBRyxHQUFHO0lBQ2pCLE9BQU8sVUFBRyxDQUFDLFVBQUMsQ0FBSSxJQUFtQixPQUFBLENBQUM7UUFDbEMsSUFBSSxFQUFFLE1BQU07UUFDWixLQUFLLEVBQUUsQ0FBQztLQUNULENBQUMsRUFIaUMsQ0FHakMsQ0FBQyxDQUFBO0FBQ0wsQ0FBQyxDQUFBO0FBRVksUUFBQSxHQUFHLEdBQUc7SUFDakIsT0FBTyxVQUFHLENBQUMsVUFBQyxDQUFJLElBQW1CLE9BQUEsQ0FBQztRQUNsQyxJQUFJLEVBQUUsT0FBTztRQUNiLEtBQUssRUFBRSxDQUFDO0tBQ1QsQ0FBQyxFQUhpQyxDQUdqQyxDQUFDLENBQUE7QUFDTCxDQUFDLENBQUE7QUFFWSxRQUFBLFVBQVUsR0FBRyxjQUFrQyxPQUFBLFdBQUcsRUFBUSxFQUFYLENBQVcsQ0FBQTtBQUUxRCxRQUFBLFVBQVUsR0FBRztJQUN4QixPQUFBLFVBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFHLEVBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFERixDQUNFLENBQUM7QUFEWixDQUNZLENBQUE7QUFFRCxRQUFBLFNBQVMsR0FBRyxVQUFlLENBQWEsRUFBRSxDQUFhO0lBQ2xFLE9BQU8sVUFBRyxDQUErQixVQUFDLENBQWU7UUFDdkQsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRTtZQUNwQixJQUFNLFVBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUM3QixPQUFPLFdBQUcsRUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFRLENBQUMsQ0FBQTtTQUNqQztRQUVELElBQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzdCLE9BQU8sV0FBRyxFQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2xDLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRVksUUFBQSxjQUFjLEdBQUcsVUFBSSxDQUFhLElBQVMsT0FBQSxDQUFDLENBQUMsS0FBSyxFQUFQLENBQU8sQ0FBQSJ9