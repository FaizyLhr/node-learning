const express = require("express");
const app = express();
const path = require("path");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const fs = require("fs");

// const EventEmitter = require("events");
// const myEmitter = new EventEmitter();

const port = process.env.PORT || 3000;

app.get("/", function (req, res, next) {
	console.log("Middleware Express Call");
	res.sendFile(__dirname + "/socketFile.html");
});

io.on("connection", function (req) {
	console.log("item");
	fs.readFile(path.join(__dirname, "test.txt"), "utf8", (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		console.log(data);
	});
});
io.on("connection", function (s) {
	// const par = args.join(",");
	console.log("Socket Connected");

	// console.log(s);
	// console.log(par);
	// for (let t = 0; t < 3; t++) {
	// 	setTimeout(() => io.emit("connection", "message from server"), 1000 * t);
	// }
});
// io.emit("connection", 1, 2, 3, "chk");

http.listen(port, () => {
	console.log(`App is listening on port: ${port}`);
});
