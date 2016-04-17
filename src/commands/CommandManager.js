"use strict";

const commands = {
	init: require("./Init"),
	install: require("./Install"),
	addmod: require("./AddMod"),
	update: require("./Update"),
	search: require("./Search")
};

exports.exists = (cmd) => {
	return commands.hasOwnProperty(cmd);
};

exports.handle = (cmd, args) => {
	commands[cmd](args);
};