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
var waitableCounter = { wait: 0, Counter: 0 };
// -- from project description
exports.example = function () {
    return lib_1.repeatUntil(function (s) { return s.Counter > 6; }, lib_1.wait(3).bind(function () {
        return lib_1._do(function (s) { return (__assign(__assign({}, s), { Counter: s.Counter + 1 })); });
    })).fun.f(waitableCounter);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yb3V0aW5lLXByb2plY3QtZGVzY3JpcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zYW1wbGVzL2Nvcm91dGluZS1wcm9qZWN0LWRlc2NyaXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSw4QkFBdUU7QUFHdkUsSUFBTSxlQUFlLEdBQXFCLEVBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUE7QUFFL0QsOEJBQThCO0FBQ2pCLFFBQUEsT0FBTyxHQUFHO0lBQ3JCLE9BQU8saUJBQVcsQ0FBZ0MsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBYixDQUFhLEVBQ2xFLFVBQUksQ0FBeUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ25DLE9BQUEsU0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsdUJBQUssQ0FBQyxLQUFFLE9BQU8sRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLENBQUMsSUFBRSxFQUE3QixDQUE2QixDQUFDO0lBQXZDLENBQXVDLENBQ3hDLENBQ0YsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBQzFCLENBQUMsQ0FBQSJ9