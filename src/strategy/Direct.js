"use strict";

const fs = require("fs");
const path = require("path");
const request = require("request");

const MiscUtils = require("../util/MiscUtils");

exports.install = (options, modsDir) => {
	MiscUtils.getFileNameForDownload(options.url, (filename) => {
		const modPath = path.join(modsDir, filename);
		fs.exists(modPath, (exists) => {
			if (!exists) {
				request(options.url).pipe(fs.createWriteStream(modPath));
			}
		});
	});
};

exports.getParams = () => {
	return [
		{
			id: "url",
			question: "url: ",
			validator: (s, callback) => { callback(true); },
			transformer: (s) => { return s; }
		}
	];
};