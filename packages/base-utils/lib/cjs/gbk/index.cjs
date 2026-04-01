Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_runtime = require("../_virtual/_rolldown/runtime.cjs");
const require_gbk_data_gbk_code_arr = require("./data/gbk_code_arr.cjs");
//#region packages/base-utils/src/gbk/index.ts
var gbk_exports = /* @__PURE__ */ require_runtime.__exportAll({
	decode: () => decode,
	encode: () => encode
});
const gbk_us = require_gbk_data_gbk_code_arr;
const arr_index = 33088;
function decode(arr) {
	var str = "";
	for (var n = 0, max = arr.length; n < max; n++) {
		var code = arr[n] & 255;
		if (code > 128 && n + 1 < max) {
			var code1 = arr[n + 1] & 255;
			if (code1 >= 64) {
				code = gbk_us[(code << 8 | code1) - arr_index];
				n++;
			}
		}
		str += String.fromCharCode(code);
	}
	return str;
}
function encode(str) {
	str += "";
	var gbk = [];
	var wh = "?".charCodeAt(0);
	for (var i = 0; i < str.length; i++) {
		var charcode = str.charCodeAt(i);
		if (charcode < 128) gbk.push(charcode);
		else {
			var gcode = gbk_us.indexOf(charcode);
			if (~gcode) {
				gcode += arr_index;
				gbk.push(255 & gcode >> 8, 255 & gcode);
			} else gbk.push(wh);
		}
	}
	return gbk;
}
//#endregion
exports.decode = decode;
exports.encode = encode;
Object.defineProperty(exports, "gbk_exports", {
	enumerable: true,
	get: function() {
		return gbk_exports;
	}
});
