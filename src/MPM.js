"use strict";

const fs = require("fs");
const path = require("path");
const request = require("request");

const CommandManager = require("./commands/CommandManager");

function mpm(args) {

	process.title = "mpm";

	if (args.length == 0) {
		// TODO: help
		console.error("Command required");
		process.exit(1);
	}

	const cmd = args[0];

	if (!CommandManager.exists(cmd)) {
		console.error("Invalid command %s", cmd);
		process.exit(1);
	}

	CommandManager.handle(cmd, args.slice(1));

};

mpm(process.argv.slice(2));