"use strict";

const fs = require("fs");
const path = require("path");

const MiscUtils = require("../util/MiscUtils");

module.exports = (query) => {
	console.log("Results for %s:", query);

	MiscUtils.getCacheFile(path.join("registry", "packs"), (f) => {

		fs.readdir(f, (err, files) => {

			for (var i in files) {

				fs.readFile(path.join(f, files[i]), (err, data) => {

					const pack = JSON.parse(data.toString());

					if (pack.id.includes(query) || pack.displayName.includes(query)) {
						console.log("%s (%s) @ %s", pack.displayName, pack.id, pack.version);
					}

				});

			}

		});

	});
	
};