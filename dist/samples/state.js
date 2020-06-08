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
                return mySetVar("y")(x).bind(function (_) {
                    return myGetVar("x").bind(function (_) {
                        return myGetVar("y").bind(function (_) {
                            return mySetVar("x")(y);
                        });
                    });
                });
            });
        });
    });
    myHelloWorld.f({ x: 3, y: 8 });
    swap.f({ x: 3, y: 8 });
    return {};
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zYW1wbGVzL3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSw4QkFBb0M7QUFFcEM7SUFDRSx1QkFBdUI7SUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0lBT2xDLElBQU0sTUFBTSxHQUFHLGNBQVMsT0FBQSxVQUFvQixDQUFHO1FBQzdDLE9BQUEsV0FBSyxDQUFDLFVBQUMsRUFBTTtZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUM3QixPQUFPLEVBQUUsR0FBRyxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUMsRUFBRSxFQUFFLENBQUE7UUFDOUIsQ0FBQyxDQUFDO0lBSEYsQ0FHRSxFQUpvQixDQUlwQixDQUFBO0lBRUosSUFBTSxNQUFNLEdBQUcsY0FBUyxPQUFBLFVBQW9CLENBQUcsSUFBSyxPQUFBLFVBQUMsUUFBZTtRQUNsRSxPQUFBLFdBQUssQ0FBQyxVQUFDLEVBQUU7O1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzdCLE9BQU8sRUFBRSxHQUFHLEVBQUMsRUFBRSxFQUFFLEdBQUcsd0JBQUssRUFBRSxnQkFBRyxDQUFDLElBQUUsUUFBUSxNQUFDLEVBQUUsQ0FBQTtRQUM5QyxDQUFDLENBQUM7SUFIRixDQUdFLEVBSmdELENBSWhELEVBSm9CLENBSXBCLENBQUE7SUFFSixJQUFNLFFBQVEsR0FBRyxNQUFNLEVBQXFCLENBQUE7SUFDNUMsSUFBTSxRQUFRLEdBQUcsTUFBTSxFQUFxQixDQUFBO0lBRTVDLElBQU0sWUFBWSxHQUNoQixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztRQUNwQixPQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO1lBQ3BCLE9BQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO2dCQUMzQixPQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztvQkFDM0IsT0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQzt3QkFDcEIsT0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQzs0QkFDcEIsT0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFBcEIsQ0FBb0IsQ0FDckI7b0JBRkMsQ0FFRCxDQUFDO2dCQUhBLENBR0EsQ0FBQztZQUpELENBSUMsQ0FBQztRQUxGLENBS0UsQ0FBQztJQU5ILENBTUcsQ0FBQyxDQUFBO0lBRU4sSUFBTSxJQUFJLEdBQ1IsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7UUFDcEIsT0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztZQUNwQixPQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO2dCQUN2QixPQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO29CQUN2QixPQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO3dCQUNwQixPQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDOzRCQUNwQixPQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQWhCLENBQWdCLENBQ2Y7b0JBRkQsQ0FFQyxDQUFDO2dCQUhGLENBR0UsQ0FBQztZQUpILENBSUcsQ0FBQztRQUxKLENBS0ksQ0FBQztJQU5MLENBTUssQ0FBQyxDQUFBO0lBRVIsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUE7SUFDNUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUE7SUFFcEIsT0FBTyxFQUFFLENBQUE7QUFDWCxDQUFDO0FBaERELDRCQWdEQyJ9