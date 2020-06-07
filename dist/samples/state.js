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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zYW1wbGVzL3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSw4QkFBb0M7QUFFcEM7SUFPRSxJQUFNLE1BQU0sR0FBRyxjQUFTLE9BQUEsVUFBb0IsQ0FBRztRQUM3QyxPQUFBLFdBQUssQ0FBQyxVQUFDLEVBQU07WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDN0IsT0FBTyxFQUFFLEdBQUcsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFDLEVBQUUsRUFBRSxDQUFBO1FBQzlCLENBQUMsQ0FBQztJQUhGLENBR0UsRUFKb0IsQ0FJcEIsQ0FBQTtJQUVKLElBQU0sTUFBTSxHQUFHLGNBQVMsT0FBQSxVQUFvQixDQUFHLElBQUssT0FBQSxVQUFDLFFBQWU7UUFDbEUsT0FBQSxXQUFLLENBQUMsVUFBQyxFQUFFOztZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUM3QixPQUFPLEVBQUUsR0FBRyxFQUFDLEVBQUUsRUFBRSxHQUFHLHdCQUFLLEVBQUUsZ0JBQUcsQ0FBQyxJQUFFLFFBQVEsTUFBQyxFQUFFLENBQUE7UUFDOUMsQ0FBQyxDQUFDO0lBSEYsQ0FHRSxFQUpnRCxDQUloRCxFQUpvQixDQUlwQixDQUFBO0lBRUosSUFBTSxRQUFRLEdBQUcsTUFBTSxFQUFxQixDQUFBO0lBQzVDLElBQU0sUUFBUSxHQUFHLE1BQU0sRUFBcUIsQ0FBQTtJQUc1QyxJQUFNLFlBQVksR0FDaEIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7UUFDcEIsT0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztZQUNwQixPQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztnQkFDM0IsT0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7b0JBQzNCLE9BQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7d0JBQ3BCLE9BQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7NEJBQ3BCLE9BQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQXBCLENBQW9CLENBQ3JCO29CQUZDLENBRUQsQ0FBQztnQkFIQSxDQUdBLENBQUM7WUFKRCxDQUlDLENBQUM7UUFMRixDQUtFLENBQUM7SUFOSCxDQU1HLENBQUMsQ0FBQTtJQUVOLElBQU0sSUFBSSxHQUNSLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO1FBQ3BCLE9BQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7WUFDcEIsT0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztnQkFDdkIsT0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztvQkFDdkIsT0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQzt3QkFDcEIsT0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQzs0QkFDcEIsT0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUFoQixDQUFnQixDQUNmO29CQUZELENBRUMsQ0FBQztnQkFIRixDQUdFLENBQUM7WUFKSCxDQUlHLENBQUM7UUFMSixDQUtJLENBQUM7SUFOTCxDQU1LLENBQUMsQ0FBQTtJQUVSLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFBO0lBQzVCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFBO0lBRXBCLE9BQU8sRUFBRSxDQUFBO0FBQ1gsQ0FBQztBQS9DRCw0QkErQ0MifQ==