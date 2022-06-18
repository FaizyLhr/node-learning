#!/usr/bin/env node

// Socket.IO example - backend - from:
// https://github.com/rsp/node-websocket-vs-socket.io
// Copyright (c) 2015, 2016 Rafał Pocztarski
// Released under MIT License (Expat) - see:
// https://github.com/rsp/node-websocket-vs-socket.io/blob/master/LICENSE.md

/*eslint-disable no-loop-func*/
let path = require("path");
let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);

app.get("/", (req, res) => {
	console.log("express connection");
	res.sendFile(path.join(__dirname, "si.html"));
});

app.get("/forced", (req, res) => {
	console.log("express connection");
	res.sendFile(path.join(__dirname, "si-forced.html"));
});

io.on("connection", (s) => {
	console.log("backend socket.io connection");
	for (let t = 0; t < 3; t++)
		setTimeout(() => s.emit("message", "message from server"), 1000 * t);
});

http.listen(3002, () => console.log("listening on http://localhost:3002/"));
console.log("socket.io example");
