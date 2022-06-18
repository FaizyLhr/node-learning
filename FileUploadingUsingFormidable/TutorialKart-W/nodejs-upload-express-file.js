const express = require("express");
const app = express();

const fs = require("fs");
const path = require("path");
const formidable = require("formidable");
var mv = require("mv");

const port = process.env.PORT || 3000;

// app.use("/", (req, res) => {
// 	res.send("Home Page");
// });

app.get("/uploadform", (req, res) => {
	// console.log("H");
	fs.readFile("upload_file.html", "utf8", (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		// console.log(data);
		res.status(200).send(data);
	});
});

// replace this with the location to save uploaded files
const upload_path = path.join(__dirname, "/Uploads/");
console.log(upload_path);

app.use("/fileupload", (req, res) => {
	const form = new formidable.IncomingForm();
	// console.log(form);
	form.parse(req, function (err, fields, files) {
		// oldPath : temporary folder to which file is saved to
		// console.log(files);
		const oldPath = files.filetoupload.path;
		// console.log(oldPath);
		const newPath = upload_path + files.filetoupload.name;
		// console.log(newPath);

		//Not Allowed to Rename File like This
		// copy the file to a new location
		// fs.rename(oldPath, newPath, function (err) {
		// 	if (err) {
		// 		console.log(err);
		// 	}
		// 	// you may respond with another html page
		// 	res.send("File uploaded and moved!");
		// });

		mv(oldPath, newPath, function (err) {
			if (err) {
				console.log(err);
				res.status(400).send(err);
			}
			// you may respond with another html page
			else {
				res.send("File uploaded and moved!");
			}
		});
	});
});

app.listen(port, () => {
	console.log(`App is listening on port: ${port}`);
});
