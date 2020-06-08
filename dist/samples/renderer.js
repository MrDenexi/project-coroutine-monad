"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../lib/state");
var pair_1 = require("../lib/pair");
function default_1(size) {
    console.log('\n --- render sample');
    var renderNothing = state_1.unitState().f({});
    var renderString = function (x) { return state_1.State(function (s) { return pair_1.Pair({}, s + x); }); };
    var renderAsterisk = renderString('*');
    var renderSpace = renderString(" ");
    var renderNewLine = renderString("\n");
    var renderLine = function (n) {
        return state_1.repeatState(n, function (_) { return renderAsterisk.bind(function (_) { return renderSpace; }); })({});
    };
    var renderSquare = function (n) {
        return state_1.repeatState(n, function (_) { return renderLine(n)
            .bind(function (_) { return renderNewLine; }); })({});
    };
    var renderThatSquare = renderSquare(size).f("");
    console.log(renderThatSquare.snd);
    return {};
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zYW1wbGVzL3JlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQTREO0FBQzVELG9DQUFrQztBQUVsQyxtQkFBd0IsSUFBWTtJQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFLbkMsSUFBTSxhQUFhLEdBQWMsaUJBQVMsRUFBeUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDekUsSUFBTSxZQUFZLEdBQUcsVUFBQyxDQUFTLElBQWdCLE9BQUEsYUFBSyxDQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsV0FBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQWYsQ0FBZSxDQUFDLEVBQTlCLENBQThCLENBQUE7SUFFN0UsSUFBTSxjQUFjLEdBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3pDLElBQU0sV0FBVyxHQUFPLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN6QyxJQUFNLGFBQWEsR0FBSyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFMUMsSUFBTSxVQUFVLEdBQUcsVUFBQyxDQUFTO1FBQzNCLE9BQUEsbUJBQVcsQ0FBdUIsQ0FBQyxFQUFFLFVBQUMsQ0FBTSxJQUFLLE9BQUEsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLFdBQVcsRUFBWCxDQUFXLENBQUMsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUEzRixDQUEyRixDQUFBO0lBRTdGLElBQU0sWUFBWSxHQUFHLFVBQUMsQ0FBUztRQUM3QixPQUFBLG1CQUFXLENBQXVCLENBQUMsRUFDakMsVUFBQyxDQUFNLElBQUssT0FBQSxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBQ3RCLElBQUksQ0FBQyxVQUFDLENBQU0sSUFBSyxPQUFBLGFBQWEsRUFBYixDQUFhLENBQUMsRUFEdEIsQ0FDc0IsQ0FDbkMsQ0FBQyxFQUFFLENBQUM7SUFITCxDQUdLLENBQUE7SUFFUCxJQUFNLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUVqQyxPQUFPLEVBQUUsQ0FBQTtBQUNYLENBQUM7QUExQkQsNEJBMEJDIn0=