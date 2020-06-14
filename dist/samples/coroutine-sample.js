"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
var lib_1 = require("../lib");
function default_1() {
    console.log(' --- coroutine sample');
    var safeGetVar = function (k) {
        return lib_1.Coroutine(function (m0) {
            if (m0.has(k)) {
                console.log('safeGetVar', k, m0.get(k));
                return lib_1.coStepResult(m0, m0.get(k));
            }
            else {
                console.error('safeGetVar error:', k);
                return lib_1.coStepError("not found");
            }
        });
    };
    var setVar = function (k, value) {
        console.log('setVar', k, value);
        return lib_1.Coroutine(function (m0) { return lib_1.coStepResult(m0.set(k, value), {}); });
    };
    var forceGetVar = function (k, fallbackValue) {
        console.log('forcegetVar', k, fallbackValue);
        return lib_1.tryCatch(safeGetVar(k), function (_) { return lib_1.Coroutine(function (m0) {
            console.error('forcegetVar error');
            return lib_1.coStepResult(m0.set(k, fallbackValue), fallbackValue);
        }); });
    };
    var myCoroutine = lib_1.unitCo()({})
        .bind(function (_) { return setVar('x', 23)
        .bind(function (_) { return setVar('y', 24)
        .bind(function (_) { return lib_1.suspend()
        .bind(function (_) { return safeGetVar('x')
        .bind(function (_) { return forceGetVar('y', 12)
        .bind(function (_) { return lib_1.suspend(); }); }); }); }); }); });
    var myCoroutineResult = myCoroutine.fun.f(immutable_1.Map());
    console.log(myCoroutineResult);
    // From project description
    //
    // RepeatUntil(s => s.Counter > 10,
    //   Wait(5).then(() =>
    //   Do(s => ({...s, Counter:s.Counter+1}))
    //   )
    // )
    return {};
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yb3V0aW5lLXNhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NhbXBsZXMvY29yb3V0aW5lLXNhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFxQztBQUdyQyw4QkFBK0Y7QUFFL0Y7SUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUE7SUFPcEMsSUFBTSxVQUFVLEdBQUcsVUFBQyxDQUFVO1FBQzVCLE9BQUEsZUFBUyxDQUFFLFVBQUMsRUFBUztZQUNuQixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDdkMsT0FBTyxrQkFBWSxDQUF3QixFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO2FBQ3BFO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUE7Z0JBQ3JDLE9BQU8saUJBQVcsQ0FBd0IsV0FBVyxDQUFDLENBQUE7YUFDdkQ7UUFDSCxDQUFDLENBQUM7SUFSRixDQVFFLENBQUE7SUFFSixJQUFNLE1BQU0sR0FBRyxVQUFDLENBQVMsRUFBRSxLQUFhO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUMvQixPQUFPLGVBQVMsQ0FBRSxVQUFDLEVBQVMsSUFBSyxPQUFBLGtCQUFZLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQWxDLENBQWtDLENBQUMsQ0FBQTtJQUN0RSxDQUFDLENBQUE7SUFFRCxJQUFNLFdBQVcsR0FBRyxVQUFDLENBQVMsRUFBRSxhQUFzQjtRQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUE7UUFDNUMsT0FBTyxjQUFRLENBQ2IsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUNiLFVBQUMsQ0FBTyxJQUFLLE9BQUEsZUFBUyxDQUFFLFVBQUMsRUFBVTtZQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUE7WUFDbEMsT0FBTyxrQkFBWSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFBO1FBQzlELENBQUMsQ0FBQyxFQUhXLENBR1gsQ0FDSCxDQUFBO0lBQ0gsQ0FBQyxDQUFBO0lBRUQsSUFBTSxXQUFXLEdBQ2YsWUFBTSxFQUFnQixDQUFPLEVBQUUsQ0FBQztTQUM3QixJQUFJLENBQUMsVUFBQyxDQUFNLElBQUssT0FBQSxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztTQUM5QixJQUFJLENBQUMsVUFBQyxDQUFNLElBQUssT0FBQSxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztTQUM5QixJQUFJLENBQUMsVUFBQyxDQUFNLElBQUssT0FBQSxhQUFPLEVBQWdCO1NBQ3RDLElBQUksQ0FBQyxVQUFDLENBQU0sSUFBSyxPQUFBLFVBQVUsQ0FBQyxHQUFHLENBQUM7U0FDOUIsSUFBSSxDQUFDLFVBQUMsQ0FBUSxJQUFLLE9BQUEsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7U0FDckMsSUFBSSxDQUFDLFVBQUMsQ0FBUSxJQUFLLE9BQUEsYUFBTyxFQUFFLEVBQVQsQ0FBUyxDQUFDLEVBRFosQ0FDWSxDQUMvQixFQUhlLENBR2YsQ0FDRixFQUxlLENBS2YsQ0FDRixFQVBlLENBT2YsQ0FDRixFQVRlLENBU2YsQ0FDRixDQUFBO0lBRUwsSUFBTSxpQkFBaUIsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxlQUFHLEVBQUUsQ0FBQyxDQUFBO0lBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUU5QiwyQkFBMkI7SUFDM0IsRUFBRTtJQUNGLG1DQUFtQztJQUNuQyx1QkFBdUI7SUFDdkIsMkNBQTJDO0lBQzNDLE1BQU07SUFDTixJQUFJO0lBRUosT0FBTyxFQUFFLENBQUE7QUFDWCxDQUFDO0FBN0RELDRCQTZEQyJ9