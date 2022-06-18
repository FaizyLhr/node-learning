// // import { createServer } from "http";

const http = require("http");

const hostname = "127.0.0.1";
const port = 3001;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	// res.end("TU mra Puttar Chutti ker");
	res.end("TU mra Puttar Changed again");
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

// const fs = require("fs");

// fs.open("G:Node.js", "r", (err, fd) => {
// 	//fd is our file descriptor
// });

// const fs = require("fs");

// fs.readFile("filename", "utf8", (err, data) => {
// 	if (err) {
// 		console.error(err);
// 		return;
// 	}
// 	console.log(data);
// });
