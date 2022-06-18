const fs = require("fs");
let fileTime = "";

const exception = (error, req, res, next) => {
	fileTime = moment().format("MMMM Do YYYY, h:mm:ss a");

	if (error) {
		fs.writeFile(`./logs/${fileTime}.log`, error, function (err) {
			if (err) throw err;
			// console.log("Saved!");
		});
	}
	return next();
};

module.exports = exception;
