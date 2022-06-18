// require("../../node_modules/socket.io/client-dist/socket.io.js");
require("/socket.io/socket.io.js");

let socket = io();

let messages = document.getElementById("messages");
let form = document.getElementById("form");
let input = document.getElementById("input");
let alertDiv = document.getElementById("alertDiv");

form.addEventListener("submit", function (e) {
	e.preventDefault();
	if (input.value) {
		socket.emit("chat message", input.value);
		input.value = "";
	}
});

socket.on("chat message", function (msg) {
	let item = document.createElement("li");
	item.textContent = msg;
	messages.appendChild(item);
	alertDiv.style.display = "block";
	setTimeout(() => {
		alertDiv.style.display = "none";
	}, 2000);
	window.scrollTo(0, document.body.scrollHeight);
});
