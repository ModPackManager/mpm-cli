"use strict";

const strategies = {
	curse: require("./Curse"),
	direct: require("./Direct")
};

exports.exists = (id) => {
	return strategies.hasOwnProperty(id);
};

exports.install = (id, options, modsDir) => {
	strategies[id].install(options, modsDir);
};

exports.getParams = (id) => {
	return strategies[id].getParams();
};