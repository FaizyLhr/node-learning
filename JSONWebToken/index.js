const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const jwt = require("jsonwebtoken");

const username = "faizy";

const secretkey = "faizysecret";

//creating token
let token = jwt.sign({ user: username }, secretkey);

console.log("Token Created: " + token);

function authToken(token) {
	try {
		const decode = jwt.verify(token, secretkey);
		console.log("logged in");
	} catch (e) {
		console.log("not logged in as token changed");
	}
}

//decoding and auth user
authToken(token);

//modifying token and again decoding and auth user
token += "modify";
authToken(token);

app.listen(port, () => {
	console.log(`App is listening on port: ${port}`);
});
