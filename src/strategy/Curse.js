"use strict";

const fs = require("fs");
const path = require("path");
const request = require("request");

const MiscUtils = require("../util/MiscUtils");

exports.install = (options, modsDir) => {
	const url = "http://minecraft.curseforge.com/projects/" + options.project + "/files/" + options.fileID + "/download";

	request.get(url).on("response", (response) => {
		const bits = response.socket._httpMessage.res.request.path.split("/");
		const filename = bits[bits.length - 1];

		const modPath = path.join(modsDir, filename);

		fs.exists(modPath, (exists) => {
			if (!exists) {
				request(url).pipe(fs.createWriteStream(modPath));
			}
		});
	});

};

exports.getParams = () => {
	return [
		{
			id: "project",
			question:  "project: ",
			validator: (s, callback) => { callback(true); },
			transformer: (s) => { return s; }
		},
		{
			id: "fileID",
			question: "file ID: ",
			validator: (s, callback) => { callback(typeof parseInt(s) === "number"); },
			transformer: (s) => { return s; }
		}
	];
};