"use strict";

const fs = require("fs");
const path = require("path");

const MiscUtils = require("../util/MiscUtils");

module.exports = (args) => {

	if (args.length == 0) {
		console.error("Missing required argument");
		process.exit(1);
	}

	console.log("Results for %s:", args[0]);

	MiscUtils.getCacheFile(path.join("registry", "packs"), (f) => {

		fs.readdir(f, (err, files) => {

			for (var i in files) {

				fs.readFile(path.join(f, files[i]), (err, data) => {

					const pack = JSON.parse(data.toString());

					if (pack.id.includes(args[0]) || pack.displayName.includes(args[0])) {
						console.log("%s (%s) @ %s", pack.displayName, pack.id, pack.version);
					}

				});

			}

		});

	});
	
};