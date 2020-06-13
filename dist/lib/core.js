"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.id = function () { return exports.Fun(function (x) { return x; }); };
exports.map_Id = function (f) { return f; };
exports.Fun = function (f) { return ({
    f: f,
    then: function (g) {
        var _this = this;
        return exports.Fun(function (x) { return g.f(_this.f(x)); });
    },
    repeat: function () {
        var _this = this;
        return exports.Fun(function (n) { return repeat(_this, n); });
    },
    repeatUntil: function () {
        var _this = this;
        return exports.Fun(function (p) { return repeatUntil(_this, p); });
    }
}); };
var repeat = function (f, n) { return n <= 1 ? f : f.then(repeat(f, n - 1)); };
var repeatUntil = function (f, predicate) { return (exports.Fun(function (x) { return (predicate.f(x)) ? exports.id().f(x) : f.then(repeatUntil(f, predicate)).f(x); })); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSWEsUUFBQSxFQUFFLEdBQUcsY0FBNkIsT0FBQSxXQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEVBQUQsQ0FBQyxDQUFDLEVBQVgsQ0FBVyxDQUFBO0FBQzdDLFFBQUEsTUFBTSxHQUFHLFVBQU8sQ0FBWSxJQUF3QixPQUFBLENBQUMsRUFBRCxDQUFDLENBQUM7QUFTdEQsUUFBQSxHQUFHLEdBQUcsVUFBTyxDQUFjLElBQWdCLE9BQUEsQ0FBQztJQUN2RCxDQUFDLEVBQUUsQ0FBQztJQUNKLElBQUksRUFBRSxVQUE4QixDQUFZO1FBQTFDLGlCQUVMO1FBREMsT0FBTyxXQUFHLENBQU8sVUFBQyxDQUFJLElBQUssT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBZCxDQUFjLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0lBQ0QsTUFBTSxFQUFFO1FBQUEsaUJBRVA7UUFEQyxPQUFPLFdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLE1BQU0sQ0FBQyxLQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQWYsQ0FBZSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNELFdBQVcsRUFBRTtRQUFBLGlCQUVaO1FBREMsT0FBTyxXQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxXQUFXLENBQUMsS0FBSSxFQUFFLENBQUMsQ0FBQyxFQUFwQixDQUFvQixDQUFDLENBQUE7SUFDdkMsQ0FBQztDQUNGLENBQUMsRUFYc0QsQ0FXdEQsQ0FBQTtBQUVGLElBQU0sTUFBTSxHQUFHLFVBQUksQ0FBWSxFQUFFLENBQVMsSUFBZ0IsT0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBckMsQ0FBcUMsQ0FBQTtBQUUvRixJQUFNLFdBQVcsR0FBRyxVQUFJLENBQVksRUFBRSxTQUEwQixJQUFnQixPQUFBLENBQzlFLFdBQUcsQ0FBTSxVQUFDLENBQUksSUFBSyxPQUFBLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFFLEVBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBeEUsQ0FBd0UsQ0FBQyxDQUM3RixFQUYrRSxDQUUvRSxDQUFBIn0=