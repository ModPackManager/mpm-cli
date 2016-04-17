"use strict";

const fs = require("fs");
const path = require("path");
const request = require("request");

const MiscUtils = require("./MiscUtils");

const DOWNLOAD = "https://s3.amazonaws.com/Minecraft.Download";
const VERSIONS = DOWNLOAD + "/versions";
const VERSION_INDEX = "https://launchermeta.mojang.com/mc/game/version_manifest.json";
const INDEXES = DOWNLOAD + "/indexes";
const ASSETS = "http://resources.download.minecraft.net";
const LIBS = "https://libraries.minecraft.net";

exports.isValidVersion = (ver, callback) => {
	getVersionJSON((data) => {
		for (var v in data.versions) {
			if (data.versions[v]["id"] === ver) {
				callback(true);
			}
		}
		callback(false);
	});
};

function getVersionJSON(callback) {
	MiscUtils.getCacheFile("versions.json", (f) => {
		fs.exists(f, (exists) => {

			if (exists) {
				fs.readFile(f, (err, data) => {
					callback(JSON.parse(data.toString()));
				});
			} else {
				const stream = fs.createWriteStream(f);
				stream.on("finish", () => {
					fs.readFile(f, (err, data) => {
						callback(JSON.parse(data.toString()));
					});
				});
				request(VERSION_INDEX).pipe(stream);
			}

		});
	});
}