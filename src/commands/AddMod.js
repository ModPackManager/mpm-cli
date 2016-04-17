"use strict";

const fs = require("fs");
const path = require("path");
const request = require("request");
const readline = require("readline");

const InputUtils = require("../util/InputUtils");
const StrategyManager = require("../strategy/StrategyManager");

const PROPS = [
	{
		id: "name",
		question: "name: ",
		validator: (s, callback) => { callback(true); },
		transformer: (s) => { return s; }
	},
	{
		id: "authors",
		question: "authors (comma separated): ",
		validator: (s, callback) => { callback(true); },
		transformer: (s) => { return s.split(", "); }
	},
	{
		id: "clientSideOnly",
		question: "client side only: ",
		validator: (s, callback) => { callback(s.toLowerCase() === "true" || s.toLowerCase() === "false") },
		transformer: (s) => { return s.toLowerCase() === "true"; }
	},
	{
		id: "strategy",
		question: "strategy: ",
		validator: (s, callback) => { callback(StrategyManager.exists(s.toLowerCase())); },
		transformer: (s) => { return s.toLowerCase(); }
	}
];

module.exports = (args) => {

	fs.exists("modpack.json", (exists) => {
		if (!exists) {
			console.error("Cannot add mod to nonexistent modpack manifest");
			process.exit(1);
		}

		var questions = PROPS.slice(0);

		const mod = {};

		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		InputUtils.get(0, questions, rl, (prop, answer) => {
			if (prop.id === "strategy") {
				mod.strategy = {};
				mod.strategy.id = answer;
			} else {
				mod[prop.id] = answer;
			}
			// if (prop.id === "strategy") {
			// 	mod.strategy = {};
			// 	mod.strategy.id = answer;
			// 	const strategyParams = StrategyManager.getParams(answer);
			// 	for (var i in strategyParams) {
			// 		questions.push(strategyParams[i]);
			// 	}
			// } else if (prop.id.startsWith("options.")) {
			// 	mod.strategy.options = {};
			// 	mod.strategy.options[prop.id.split(".")[1]] = answer;
			// } else {
			// 	mod[prop.id] = answer;
			// }
		}, () => {

			const strategyOptions = StrategyManager.getParams(mod.strategy.id);

			mod.strategy.options = {};

			InputUtils.get(0, strategyOptions, rl, (prop, answer) => {
				mod.strategy.options[prop.id] = answer;
			}, () => {
				rl.close();

				fs.readFile("modpack.json", (err, data) => {
					const modpack = JSON.parse(data.toString());
					modpack.mods.push(mod);
					fs.writeFile("modpack.json", JSON.stringify(modpack, null, 4), (err) => {
						console.log("Mod added");
					})
				});
			});

			// rl.close();

			// fs.readFile("modpack.json", (err, data) => {
			// 	const modpack = JSON.parse(data.toString());
			// 	modpack.mods.push(mod);
			// 	fs.writeFile("modpack.json", JSON.stringify(modpack, null, 4), (err) => {
			// 		console.log("Mod added");
			// 	});
			// });
		});

	});

};