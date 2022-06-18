const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT || 3000;

// app.get("/", function (req, res, next) {
// 	res.write("<h1>Hello world</h1>");
// });

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/display.html");
});

io.on("connection", (socket) => {
	console.log("a user connected");
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

io.on("connection", (socket) => {
	socket.on("chat message", (msg) => {
		console.log("message: " + msg);
	});
});

// For Broadcasting

// io.emit("some event", {
// 	someProperty: "some value",
// 	otherProperty: "other value",
// }); // This will emit the event to all connected sockets

io.on("connection", (socket) => {
	socket.on("chat message", (msg) => {
		io.emit("chat message", msg);
	});
});

server.listen(port, () => {
	console.log(`App is listening on port: ${port}`);
});
