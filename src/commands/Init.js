"use strict";

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const semver = require("semver");

const MiscUtils = require("../util/MiscUtils");
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
		id: "mcVersion",
		question: "mc version: ",
		validator: (s, callback) => { MC.isValidVersion(s, callback); },
		transformer: (s) => { return s; }
	},
	{
		id: "forgeVersion",
		question: "forge version (empty for none): ",
		validator: (s, callback) => { 
			if (s) Forge.isValidVersion(s, callback);
			else callback(true);
		},
		transformer: (s) => { return s; }
	},
	{
		id: "overrideURL",
		question: "override download URL: ",
		validator: (s, callback) => { callback(true); },
		transformer: (s) => { return s; }
	}
];

module.exports = () => {
	const config = {};

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	get(rl, config, () => {
		rl.close();

		config.mods = [];

		MiscUtils.getCacheFile(path.join("registry", "packs", config.id + ".json"), (f) => {
			fs.writeFile(f, JSON.stringify(config, null, 4), () => {
				console.log("Initialized %s", f);
			})
		});
	});
};

function get(rl, obj, callback) {
	InputUtils.get(0, PROPS, rl, (prop, answer) => {
		obj[prop.id] = answer;
	}, callback);
}