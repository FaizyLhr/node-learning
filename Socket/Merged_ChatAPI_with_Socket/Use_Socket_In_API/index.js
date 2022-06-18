const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const mongoose = require("mongoose");

const MessageModel = require("./Message");

mongoose
	.connect(
		process.env.MONGODB_URI || "mongodb://localhost:27017/RealtimeChat",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			// useFindAndModify: false,
			// useCreateIndex: true,
		}
	)
	.then(() => {
		console.log("Connection Successful!!");
	})
	.catch((err) => console.log(err));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/display.html");
});
const msgs = MessageModel.find({}).then((data) => {
	console.log(data);
	// io.emit("chat message", data, msg);
});

io.emit("display", msgs);

io.on("connection", (socket) => {
	console.log("a user connected");
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

io.on("connection", (socket) => {
	socket.on("chat message", async (msg) => {
		console.log("message: " + msg);
		const msgBody = await MessageModel.create({
			text: msg,
		});
		msgBody.save();
	});
});

io.on("connection", (socket) => {
	socket.on("chat message", (msg) => {
		console.log(msg);
		MessageModel.find({}).then((data) => {
			console.log(data);
			io.emit("chat message", data, msg);
		});
	});
});

server.listen(port, () => {
	console.log(`listening on ${port}`);
});
