require("./_virtual/_rolldown/runtime.cjs");
var _mcswift_base_utils = require("@mcswift/base-utils");
Object.keys(_mcswift_base_utils).forEach(function(k) {
	if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function() {
			return _mcswift_base_utils[k];
		}
	});
});
