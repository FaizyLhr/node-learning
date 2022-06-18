const express = require("express");
const app = express();
const appDef = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

// console.log(process.env.PORT);

app.use(bodyParser.urlencoded({ extended: false, limit: "500mb" }));
app.use(bodyParser.json({ limit: "500mb" }));

require("./server/config/mongo");

require("./server/models/Message");
require("./server/models/User");

app.use(require("./server/routes"));

app.get("/", function (req, res) {
	res.send("Home Page");
});

//Merging socket With Api
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
	console.log("a user Connected");

	socket.on("chat message", (msg) => {
		io.emit("chat message", msg);
	});
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

server.listen(port, () => {
	console.log(`App is listening on port: ${port}`);
});
