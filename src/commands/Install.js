"use strict";

const fs = require("fs");
const path = require("path");
const request = require("request");

const StrategyManager = require("../strategy/StrategyManager.js");

module.exports = (args) => {
	if (args.length == 0) {
		console.error("No modpack specified");
		process.exit(1);
	}

	MiscUtils.getCacheFile(path.join("registry", "packs", args[0] + ".json"), (f) => {
		fs.readFile(f, (err, data) => {
			const modpack = JSON.parse(data.toString());

			console.log("Installing modpack %s (%s) @ %s", modpack.displayName, modpack.id, modpack.version);

			const installDir = args.length == 2 ? args[1] : ".";
			const modsDir = path.join(installDir, "mods");

			fs.mkdir(modsDir, () => {

				for (var i in modpack.mods) {
					const mod = modpack.mods[i];

					console.log("Attempting to install mod %s", mod.name);

					if (StrategyManager.exists(mod.strategy.id)) {
						StrategyManager.install(mod.strategy.id, mod.strategy.options, modsDir);
					} else {
						console.error("Couldn't install mod using strategy %s", mod.strategy.id);
					}
				}

			});

		});
	});

};