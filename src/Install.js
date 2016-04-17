"use strict";

const fs = require("fs");
const Git = require("nodegit");

const MiscUtils = require("./util/MiscUtils");

MiscUtils.getCacheFile("registry", (f) => {
	fs.exists(f, (exists) => {
		if (!exists) {
			Git.Clone("https://github.com/ModPackManager/mpm-registry", f)
				.done(() => {
					console.log("mpm-registry cloned successfully");
				});
		} else {
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
		}
	});
	
});