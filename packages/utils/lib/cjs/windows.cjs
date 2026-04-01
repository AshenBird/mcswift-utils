require("./_virtual/_rolldown/runtime.cjs");
var _mcswift_windows = require("@mcswift/windows");
Object.keys(_mcswift_windows).forEach(function(k) {
	if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function() {
			return _mcswift_windows[k];
		}
	});
});
