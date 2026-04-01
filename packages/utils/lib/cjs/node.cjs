require("./_virtual/_rolldown/runtime.cjs");
var _mcswift_node = require("@mcswift/node");
Object.keys(_mcswift_node).forEach(function(k) {
	if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function() {
			return _mcswift_node[k];
		}
	});
});
