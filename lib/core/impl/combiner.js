"use strict";
exports.__esModule = true;
function default_1(mws) {
    return function (action, state, processor, complete) {
        var point = -1;
        var mw;
        dispatch(0);
        function dispatch(i) {
            point = i;
            if (i === mws.length) {
                complete(action);
                return;
            }
            mw = mws[i];
            mw(action, state, function (result) {
                processor(result);
                dispatch(i + 1);
            });
        }
    };
}
exports["default"] = default_1;
//# sourceMappingURL=combiner.js.map