"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("./core");
exports.Cons = function (head, tail) { return ({
    kind: "Cons",
    head: head,
    tail: tail,
    then: function (f) {
        return exports.bindList(core_1.Fun(f)).f(this);
    },
    thenF: function (f) {
        return exports.bindList(f).f(this);
    }
}); };
exports.Empty = function () { return ({
    kind: "Empty",
    then: function (f) {
        return exports.bindList(core_1.Fun(f)).f(this);
    },
    thenF: function (f) {
        return exports.bindList(f).f(this);
    }
}); };
exports.mapList = function (f) {
    return core_1.Fun(function (l) { return l.kind === "Cons" ? exports.Cons(f.f(l.head), exports.mapList(f).f(l.tail)) : exports.Empty(); });
};
exports.joinList = function () {
    return core_1.Fun(function (ll) {
        // if empty, create new empty
        if (ll.kind == "Empty")
            return exports.Empty();
        // if contained list is empty, continue with tail
        if (ll.head.kind == "Empty")
            return exports.joinList().f(ll.tail);
        // else join tail, and concat with head
        return exports.concatList(ll.head).f(exports.joinList().f(ll.tail));
    });
};
exports.bindList = function (k) {
    return exports.mapList(k).then(exports.joinList());
};
exports.concatList = function (l1) {
    return core_1.Fun(function (l2) {
        return l1.kind == "Empty" ? l2 : exports.Cons(l1.head, exports.concatList(l1.tail).f(l2));
    });
};
exports.pushToList = function (l) {
    return core_1.Fun(function (x) {
        return l.kind == "Empty" ? exports.Cons(x, exports.Empty()) : exports.Cons(l.head, exports.pushToList(l.tail).f(x));
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQTRCO0FBYWYsUUFBQSxJQUFJLEdBQUcsVUFBSSxJQUFPLEVBQUUsSUFBYSxJQUFjLE9BQUEsQ0FBQztJQUMzRCxJQUFJLEVBQUUsTUFBTTtJQUNaLElBQUksTUFBQTtJQUNKLElBQUksTUFBQTtJQUNKLElBQUksRUFBRSxVQUEyQixDQUFvQjtRQUNuRCxPQUFPLGdCQUFRLENBQUMsVUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2pDLENBQUM7SUFDRCxLQUFLLEVBQUUsVUFBMkIsQ0FBaUI7UUFDakQsT0FBTyxnQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM1QixDQUFDO0NBQ0YsQ0FBQyxFQVYwRCxDQVUxRCxDQUFBO0FBRVcsUUFBQSxLQUFLLEdBQUcsY0FBa0IsT0FBQSxDQUFDO0lBQ3RDLElBQUksRUFBRSxPQUFPO0lBQ2IsSUFBSSxFQUFFLFVBQTJCLENBQW9CO1FBQ25ELE9BQU8sZ0JBQVEsQ0FBQyxVQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDakMsQ0FBQztJQUNELEtBQUssRUFBRSxVQUEyQixDQUFpQjtRQUNqRCxPQUFPLGdCQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzVCLENBQUM7Q0FDRixDQUFDLEVBUnFDLENBUXJDLENBQUE7QUFFVyxRQUFBLE9BQU8sR0FBRyxVQUFPLENBQVk7SUFDeEMsT0FBTyxVQUFHLENBQUMsVUFBQyxDQUFVLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBSSxDQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLGVBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQUssRUFBSyxFQUEzRSxDQUEyRSxDQUFDLENBQUE7QUFDekcsQ0FBQyxDQUFBO0FBRVksUUFBQSxRQUFRLEdBQUc7SUFDdEIsT0FBTyxVQUFHLENBQ1IsVUFBQyxFQUFpQjtRQUNoQiw2QkFBNkI7UUFDN0IsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLE9BQU87WUFBUSxPQUFPLGFBQUssRUFBSyxDQUFBO1FBQy9DLGlEQUFpRDtRQUNqRCxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU87WUFBRyxPQUFPLGdCQUFRLEVBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzdELHVDQUF1QztRQUN2QyxPQUFPLGtCQUFVLENBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDN0IsZ0JBQVEsRUFBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQ3pCLENBQUE7SUFDSCxDQUFDLENBQ0YsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQUVZLFFBQUEsUUFBUSxHQUFHLFVBQU0sQ0FBa0I7SUFDOUMsT0FBTyxlQUFPLENBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFRLEVBQUssQ0FBQyxDQUFBO0FBQ2xELENBQUMsQ0FBQTtBQUVZLFFBQUEsVUFBVSxHQUFHLFVBQUksRUFBVztJQUN2QyxPQUFPLFVBQUcsQ0FDUixVQUFDLEVBQVk7UUFDWCxPQUFBLEVBQUUsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLGtCQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUFsRSxDQUFrRSxDQUNyRSxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBRVksUUFBQSxVQUFVLEdBQUcsVUFBSSxDQUFVO0lBQ3RDLE9BQU8sVUFBRyxDQUNSLFVBQUMsQ0FBRztRQUNGLE9BQUEsQ0FBQyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLFlBQUksQ0FBSSxDQUFDLEVBQUUsYUFBSyxFQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBSSxDQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsa0JBQVUsQ0FBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQXhGLENBQXdGLENBQzNGLENBQUE7QUFDSCxDQUFDLENBQUEifQ==