"use strict";

const fs = require("fs");
const path = require("path");
const request = require("request");

const Errors = require("./Errors");
const CommandManager = require("./commands/CommandManager");

function mpm(args) {

	process.title = "mpm";

	if (args.length == 0) {
		// TODO: help
		console.error("Command required");
		process.exit(Errors.CMD_REQUIRED);
	}

	const cmd = args[0];

	if (!CommandManager.exists(cmd)) {
		console.error("Invalid command %s", cmd);
		process.exit(Errors.CMD_INVALID);
	}

	CommandManager.handle(cmd, args.slice(1));

};

mpm(process.argv.slice(2));