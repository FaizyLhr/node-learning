// const imageFilter = function (req, file, cb) {
// 	// Accept images only
// 	if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
// 		req.fileValidationError = "Only image files are allowed!";
// 		return cb(new Error("Only image files are allowed!"), false);
// 	}
// 	cb(null, true);
// };
// exports.imageFilter = imageFilter;

const path = require("path");

const imageFilter = function (req, file, cb) {
	// Set the filetypes, it is optional
	let filetypes = /jpeg|jpg|png/;
	let mimetype = filetypes.test(file.mimetype);

	let extname = filetypes.test(path.extname(file.originalname).toLowerCase());

	if (mimetype && extname) {
		return cb(null, true);
	}

	cb(
		`Error: File upload only supports the
				following filetypes - 
				${filetypes}`
	);
};

exports.imageFilter = imageFilter;
