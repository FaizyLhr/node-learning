const express = require("express");
const app = express();
const fs = require("fs");

var moment = require("moment");

let fileTime = "",
	data = "";

const logFolder = "./logs/";

// const error = require("./error");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	try {
		console.log("home call");
		res.send("home");
	} catch (err) {
		fileTime = moment().format("MMMM Do YYYY, h:mm:ss a");

		fs.writeFile(`./logs/${fileTime}.log`, err, function (err) {
			if (err) throw err;
			// console.log("Saved!");
		});
	}
});

app.get("/user", (req, res) => {
	try {
		console.log("user call");
		res.send("user");
		next();
	} catch (err) {
		fileTime = moment().format("MMMM Do YYYY, h:mm:ss a");

		fs.writeFile(`./logs/${fileTime}.log`, err, function (err) {
			if (err) throw err;
			// console.log("Saved!");
		});
	}
});
app.get("/about", (req, res) => {
	try {
		console.log("about call");
		res.send("about");
		next();
	} catch (err) {
		fileTime = moment().format("MMMM Do YYYY, h:mm:ss a");

		fs.writeFile(`./logs/${fileTime}.log`, err, function (err) {
			if (err) throw err;
			// console.log("Saved!");
		});
	}
});

app.get("/logs", async (req, res) => {
	await fs.readdir(logFolder, (err, files) => {
		files.forEach((file) => {
			console.log(file);
		});
	});
	res.send("Done");
});

//task
// for every exception request
// app.use(function (err, req, res, next) {
// 	fileTime = moment().format("MMMM Do YYYY, h:mm:ss a");
// 	data = response.error;

// 	fs.writeFile(`./logs/${fileTime}.log`, data, function (err) {
// 		if (err) throw err;
// 		// console.log("Saved!");
// 	});

// 	res.status(err.status || 500).json(response.error(err.status || 500));
// });
// app.use("/*", (req, res) => {
// 	console.log("Exception");
// 	res.send("Exception");
// });

app.get("/*", (req, res) => {
	console.log("exception");

	fileTime = moment().format("MMMM Do YYYY, h:mm:ss a");

	fs.writeFile(`./logs/${fileTime}.log`, "Route Not Defined", function (err) {
		if (err) throw err;
		console.log("Saved!");
	});

	console.log("exception");
	res.send("exception");
});

app.listen(port, () => {
	console.log(`App is listening on port: ${port}`);
});
