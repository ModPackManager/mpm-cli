"use strict";

const fs = require("fs");
const path = require("path");
const request = require("request");

const program = require("commander");

program.version("0.1.0");

program
	.command("init")
	.description("Initialize a new modpack and open it using $EDITOR")
	.action(require("./commands/Init"));

program
	.command("install [modpack]")
	.description("Install [modpack] to [dir]")
	.option("-s, --side [side]", "If specified, server version will be installed, client is assumed if not specified")
	.option("-d, --dir [dir]", "Where to install the modpack")
	.action(require("./commands/Install"));

program
	.command("addmod [modpack]")
	.description("Add a mod to [modpack]")
	.action(require("./commands/AddMod"));

program
	.command("search [query]")
	.description("Search for [query] in the local modpack registry")
	.action(require("./commands/Search"));

program
	.command("update")
	.description("Update the local modpack registry")
	.action(require("./commands/Update"));


program.parse(process.argv);