"use strict";

function get(i, questions, rl, perObjCallback, callback) {
	if (i < questions.length) {
		var prop = questions[i];
		question(rl, prop.question, prop.validator, prop.transformer, (answer) => {
			perObjCallback(prop, answer);
			get(i + 1, questions, rl, perObjCallback, callback);
		});
	} else {
		callback();
	}
}
exports.get = get;

function question(rl, q, validator, transformer, callback) {
	rl.question(q, (answer) => {
		validator(answer, (valid) => {
			if (valid) {
				callback(transformer(answer));
			} else {
				question(rl, q, validator, transformer, callback);
			}
		});
	});
}
exports.question = question;