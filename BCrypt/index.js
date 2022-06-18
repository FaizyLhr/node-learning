const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const bcrypt = require("bcrypt");
const saltRounds = 10;

const password = "hello-world";
console.log("Password before hashing " + password);

//hashing
const hashedPassword = bcrypt.hashSync(password, saltRounds);
console.log("Password after hashing " + hashedPassword);

//verifying
const result = bcrypt.compareSync(password, hashedPassword);
result ? console.log("User verified") : console.log("User not verified");

app.listen(port, () => {
	console.log(`App is listening on port: ${port}`);
});
