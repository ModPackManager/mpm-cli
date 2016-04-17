"use strict";

const fs = require("fs");
const path = require("path");
const Git = require("nodegit");

const MiscUtils = require("../util/MiscUtils");

module.exports = (args) => {
	MiscUtils.getCacheFile("registry", (f) => {
		var repository;
		Git.Repository.open(f)
			.then((repo) => {
				repository = repo;
				return repository.fetchAll({
					callbacks: {
						credentials: (url, userName) => {
							return Git.Cred.sshKeyFromAgent(userName);
						},
						certificateCheck: () => {
							return 1;
						}
					}
				});
			})
			.then(() => {
				repository.mergeBranches("master", "origin/master");
			})
			.done(() => {
				console.log("mpm-registry updated successfully");
			});
	});
};