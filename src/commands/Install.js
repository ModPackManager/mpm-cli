"use strict";

const fs = require("fs");
const path = require("path");
const request = require("request");

const StrategyManager = require("../strategy/StrategyManager.js");

module.exports = (args) => {
	fs.readFile("modpack.json", (err, data) => {
		const modpack = JSON.parse(data.toString());

		console.log("Installing modpack %s", modpack.displayName);

		fs.mkdir("mods", () => {

			for (var i in modpack.mods) {
				const mod = modpack.mods[i];

				console.log("Attempting to install mod %s", mod.name);

				if (StrategyManager.exists(mod.strategy.id)) {
					StrategyManager.install(mod.strategy.id, mod.strategy.options, "mods");
				} else {
					console.error("Couldn't install mod using strategy %s", mod.strategy.id);
				}
			}

		});

	});
};