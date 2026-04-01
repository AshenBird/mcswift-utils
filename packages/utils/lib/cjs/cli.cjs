require("./_virtual/_rolldown/runtime.cjs");
var _mcswift_cli = require("@mcswift/cli");
Object.keys(_mcswift_cli).forEach(function(k) {
	if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function() {
			return _mcswift_cli[k];
		}
	});
});
