var _mcswift_node_path = require("@mcswift/node/path");
Object.keys(_mcswift_node_path).forEach(function(k) {
	if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function() {
			return _mcswift_node_path[k];
		}
	});
});
