var _mcswift_node_child_process = require("@mcswift/node/child_process");
Object.keys(_mcswift_node_child_process).forEach(function(k) {
	if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function() {
			return _mcswift_node_child_process[k];
		}
	});
});
