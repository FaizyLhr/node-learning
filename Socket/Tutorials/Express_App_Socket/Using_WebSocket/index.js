const express = require("express");
const app = express();
const path = require("path");

const expressWs = require("express-ws");
const ws = expressWs(app);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	console.log("Backend Connected");
	res.sendFile(path.join(__dirname, "/display.html"));
});

// app.get("/echo", (req, res) => {
// 	console.log("echo Connected");
// 	res.send();
// 	// res.sendFile(path.join(__dirname, "/display.html"));
// });

// app.ws("/echo", function (ws, req) {
// 	ws.on("message", function (msg) {
// 		ws.send(msg);
// 	});
// });

app.ws("/", (ws, req) => {
	console.log("websocket connection");
	for (var t = 0; t < 3; t++)
		setTimeout(
			() => ws.send("Backend message from server <br>", () => {}),
			1000 * t
		);
});

app.listen(port, () => {
	console.log(`App is listening on port: ${port}`);
});
