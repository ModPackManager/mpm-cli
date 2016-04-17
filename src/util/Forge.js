"use strict";

const request = require("request");

const FORGE_MAVEN = "http://files.minecraftforge.net/maven/"

exports.isValidVersion = (ver, callback) => {
	request(getMavenURLForVersion(ver))
		.on("response", (response) => {
			if (response.statusCode == 200) {
				callback(true);
			} else {
				callback(false);
			}
		});
};

function getMavenURLForVersion(ver) {
	const s = FORGE_MAVEN + "net/minecraftforge/forge/" + ver + "/forge-" + ver + "-universal.jar";
	return s;
}