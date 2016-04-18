"use strict";

const fs = require("fs");
const path = require("path");
const request = require("request");

const MiscUtils = require("../util/MiscUtils");
const StrategyManager = require("../strategy/StrategyManager.js");

module.exports = (modpack, options) => {
	MiscUtils.getCacheFile(path.join("registry", "packs", modpack + ".json"), (f) => {
		fs.readFile(f, (err, data) => {
			const modpack = JSON.parse(data.toString());

			console.log("Installing modpack %s (%s) @ %s", modpack.displayName, modpack.id, modpack.version);

			const installDir = options.dir || ".";
			const modsDir = path.join(installDir, "mods");

			var clientSide = options.server || true;

			fs.mkdir(installDir, () => {
				fs.mkdir(modsDir, () => {
					for (var i in modpack.mods) {
						const mod = modpack.mods[i];

						if ((mod.clientSideOnly && clientSide) || (!mod.clientSideOnly && !clientSide)) {
							console.log("Attempting to install mod %s", mod.name);

							if (StrategyManager.exists(mod.strategy.id)) {
								StrategyManager.install(mod.strategy.id, mod.strategy.options, modsDir);
							} else {
								console.error("Couldn't install mod using strategy %s", mod.strategy.id);
							}
						}
					}
				});
			});

		});
	});

};