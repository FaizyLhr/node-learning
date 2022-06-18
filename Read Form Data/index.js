const express = require("express");
const app = express();
const multer = require("multer");

const multerRead = multer();

// app.use(multerRead.array());
app.use(multer().array());
// app.use(express.static("public"));

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", function (req, res, next) {
	res.send("Running");
});

app.post("/read", (req, res, next) => {
	console.log("inside");
	// console.log(req);
	// console.log(req.text);
	// console.log(req.data);
	// console.log(req.body);

	// console.log(req);
	// console.log(req.body);
	let bodyJSON = JSON.stringify(req.body);
	console.log(bodyJSON);
	res.send("Read");
});

app.listen(port, () => {
	console.log(`App is listening on port: ${port}`);
});
