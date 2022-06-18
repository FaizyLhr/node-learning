const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

// console.log(process.env.PORT);
// app.use(express.static(__dirname + "./server/public"));

app.use(bodyParser.urlencoded({ extended: false, limit: "500mb" }));
app.use(bodyParser.json());

require("./server/config/mongo");

const MessageModel = require("./server/models/Message");
require("./server/models/User");

app.use(require("./server/routes"));

// console.log(__dirname);
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/server/public/display.html");
});

//Merging socket With Api
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.post("/sendMessage", async function (req, res) {
	// console.log(req.body.val);
	try {
		const reqText = req.body.val;

		if (!reqText) {
			res.status(400).send("Text Not Entered");
		}

		const msg = await MessageModel.create({
			text: reqText,
		});
		// msg.SentBy = req.user._id;
		msg.save();
		// res.status(201).write(msg);
		io.emit("chat message", msg);

		io.on("connection", (socket) => {
			// console.log("a user Connected");
			socket.on("chat message", (msg) => {
				io.emit("chat message", msg);
			});
			// socket.on("disconnect", () => {
			// 	console.log("user disconnected");
			// });
		});
		res.redirect("/viewMessages");
	} catch (e) {
		console.log(e);
	}
});

app.get("/viewMessages", (req, res) => {
	MessageModel.find({})
		.then((data) => {
			// console.log(data);
			res.send(data);
		})
		.catch((err) => {
			console.log(err);
		});
	// res.redirect("/");
});

// io.on("connection", (socket) => {
// 	console.log("a user Connected");

// 	socket.on("chat message", (msg) => {
// 		io.emit("chat message", msg);
// 	});
// 	socket.on("disconnect", () => {
// 		console.log("user disconnected");
// 	});
// });

server.listen(port, () => {
	console.log(`App is listening on port: ${port}`);
});
