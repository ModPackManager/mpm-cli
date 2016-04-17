"use strict";

const commands = {
	init: require("./Init"),
	install: require("./Install"),
	addmod: require("./AddMod")
};

exports.exists = (cmd) => {
	return commands.hasOwnProperty(cmd);
};

exports.handle = (cmd, args) => {
	commands[cmd](args);
};