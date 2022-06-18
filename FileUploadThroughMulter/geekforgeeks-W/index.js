const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();

const helpers = require("./helpers");

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// var upload = multer({ dest: "Upload_folder_name" })
// If you do not want to use diskStorage then uncomment it

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// Uploads is the Upload_folder_name
		cb(null, "uploads");
	},
	// By default, multer removes file extensions so let's add them back
	filename: function (req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

app.get("/", function (req, res) {
	// res.render("Signup");
	res.render("Form");
});

app.post("/uploadProfilePicture", function (req, res, next) {
	// Define the maximum size for uploading
	// picture i.e. 1 MB. it is optional
	const maxSize = 1 * 1000 * 1000;

	let upload = multer({
		storage: storage,
		limits: { fileSize: maxSize },
		fileFilter: helpers.imageFilter,

		// mypic is the name of file attribute
	}).single("mypic");
	s;
	// Error MiddleWare for multer file upload, so if any
	// error occurs, the image would not be uploaded!
	upload(req, res, function (err) {
		if (err) {
			// ERROR occurred (here it can be occurred due
			// to uploading image of size greater than
			// 1MB or uploading different file type)
			res.send(err);
		}
		// else {
		// 	// SUCCESS, image successfully uploaded
		// 	res.send("Success, Image uploaded!");
		// }

		// if (req.fileValidationError) {
		// 	return res.send(req.fileValidationError);
		// } else if (!req.file) {
		// 	return res.send("Please select an image to upload");
		// } else if (err instanceof multer.MulterError) {
		// 	return res.send(err);
		// } else if (err) {
		// 	return res.send(err);
		// }

		// Display uploaded image for user validation
		res.send("Success, Image uploaded!");
		// res.send(
		// 	`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`
		// );
	});
});

app.post("/upload-multiple-images", (req, res) => {
	// 10 is the limit I've defined for number of uploaded files at once
	// 'multiple_images' is the name of our file input field
	let upload = multer({
		storage: storage,
		fileFilter: helpers.imageFilter,
	}).array("multiple_images", 10);

	upload(req, res, function (err) {
		// if (req.fileValidationError) {
		// 	return res.send(req.fileValidationError);
		// } else if (!req.file) {
		// 	return res.send("Please select an image to upload");
		// } else if (err instanceof multer.MulterError) {
		// 	return res.send(err);
		// } else if (err) {
		// 	return res.send(err);
		// }

		if (err) {
			// ERROR occurred (here it can be occurred due
			// to uploading image of size greater than
			// 1MB or uploading different file type)
			res.send(err);
		}

		// let result = "You have uploaded these images: <hr />";
		const files = req.files;
		let index, len;

		// Loop through all the uploaded images and display them on frontend
		for (index = 0, len = files.length; index < len; ++index) {
			result += `<img src="${files[index].path}" width="100px" style="margin-right: 20px;">`;
			// let picPath = `${files[index].path}`;
			// result += `<img src="${path.join(
			// 	__dirname,
			// 	picPath
			// )}" width="300" style="margin-right: 20px;">`;
		}
		result += '<hr/><a href="./">Upload more images</a>';
		// console.log(result);
		// res.send(result);
		res.send(
			`You have uploaded these images <hr /><a href="./">Upload more images</a>`
		);
	});
});

// Take any port number of your choice which
// is not taken by any other process
app.listen(3000, function (error) {
	if (error) throw error;
	console.log("Server created Successfully on PORT 3000");
});
