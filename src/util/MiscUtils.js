"use strict";

const fs = require("fs");
const path = require("path");
const request = require("request");

function getUserHome() {
	return process.env[(process.platform == "win32") ? "USERPROFILE" : "HOME"];
}
exports.getUserHome = getUserHome;


function getMPMDir() {
	return path.join(getUserHome(), ".mpm/");
}
exports.getMPMDir = getMPMDir;

exports.getCacheFile = (f, callback) => {
	fs.exists(getMPMDir(), (exists) => {
		if (!exists) {
			fs.mkdir(getMPMDir(), () => {
				callback(path.join(getMPMDir(), f));
			});
		} else {
			callback(path.join(getMPMDir(), f));
		}
	});
};


// try content-disposition, fallback on URL
function getFileNameForDownload(url, callback) {
	request
		.get(url)
		.on("response", (response) => {
			if (response.headers.hasOwnProperty("content-disposition")) {

				const bits = response.headers["content-disposition"].split(" ");

				for (var i in bits) {
					if (bits[i].startsWith("filename")) {
						callback(bits[i].split("=")[1]);
						return;
					}
				}
			}

			const bits = url.split("/");
			callback(bits[bits.length - 1]);
		});
}
exports.getFileNameForDownload = getFileNameForDownload;