"use strict";

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const semver = require("semver");

const InputUtils = require("../util/InputUtils");
const MC = require("../util/MC");
const Forge = require("../util/Forge");

const PROPS = [
	{
		id: "id",
		question: "id: ",
		validator: (s, callback) => { callback(true); },
		transformer: (s) => { return s; }
	},
	{
		id: "displayName",
		question: "display name: ",
		validator: (s, callback) => { callback(true); },
		transformer: (s) => { return s; }
	},
	{
		id: "version",
		question: "version (semver): ",
		validator: (s, callback) => { callback(semver.valid(s)); },
		transformer: (s) => { return s; }
	},
	{
		id: "description",
		question: "description: ",
		validator: (s, callback) => { callback(true); },
		transformer: (s) => { return s; }
	},
	{
		"id": "mcVersion",
		"question": "mc version: ",
		validator: (s, callback) => { MC.isValidVersion(s, callback); },
		transformer: (s) => { return s; }
	},
	{
		"id": "forgeVersion",
		"question": "forge version (empty for none): ",
		validator: (s, callback) => { Forge.isValidVersion(s, callback); },
		transformer: (s) => { return s; }
	}
];

module.exports = (args) => {
	const jsonPath = "modpack.json";

	const config = {};

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	get(rl, config, () => {
		rl.close();

		config.mods = [];

		fs.writeFile(jsonPath, JSON.stringify(config, null, 4), () => {
			console.log("Initialized %s", jsonPath);
		})
	});
};

function get(rl, obj, callback) {
	InputUtils.get(0, PROPS, rl, (prop, answer) => {
		obj[prop.id] = answer;
	}, callback);
}

// function get(i, rl, config, callback) {
// 	if (i < PROPS.length) {
// 		var prop = PROPS[i];
// 		question(rl, prop.question, prop.validator, (answer) => {
// 			config[prop.id] = answer;
// 			get(i + 1, rl, config, callback);
// 		});

// 	} else {
// 		callback();
// 	}
// }

// function question(rl, q, validator, callback) {
// 	rl.question(q, (answer) => {
// 		validator(answer, (valid) => {
// 			if (valid) {
// 				callback(answer);
// 			} else {
// 				question(rl, q, validator, callback);
// 			}
// 		});
// 	});
// }