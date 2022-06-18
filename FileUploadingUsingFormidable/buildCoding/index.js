const express = require("express");
const app = express();

const path = require("path");
var fs = require("fs");
var formidable = require("formidable");

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "/node_modules")));

// POST service with upload url extension.
app.post("/upload", function (req, res) {
	// create an incoming form object
	var form = new formidable.IncomingForm();

	// specify that we want to allow the user to upload multiple files in a single request
	form.multiples = true;

	// store all uploads in the /uploads directory
	form.uploadDir = path.join(__dirname, "/uploads");

	// every time a file has been uploaded successfully,
	// rename it to it's original name
	form.on("file", function (field, file) {
		fs.rename(file.path, path.join(form.uploadDir, file.name), function (err) {
			if (err) throw err;
			//console.log('renamed complete');
		});
	});

	// log any errors that occur
	form.on("error", function (err) {
		console.log("An error has occurred: \n" + err);
	});

	// once all the files have been uploaded, send a response to the client
	form.on("end", function () {
		res.end("success");
	});

	// parse the incoming request containing the form data
	form.parse(req);
});

app.listen(port, () => {
	console.log(`App is listening on port: $port}`);
});
