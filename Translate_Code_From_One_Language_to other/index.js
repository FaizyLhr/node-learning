const express = require("express");
const app = express();
const translate = require("translate");

const port = process.env.PORT || 3000;

async function translateString(str, translateTo) {
	// translate.engine = "libre";
	const translated_string = await translate(str, translateTo);
	console.log(translated_string);
}

app.get("/", function (req, res, next) {
	res.send("Home Page");
});

// English to Spanish
translateString("Hello World", "ru");

app.listen(port, () => {
	console.log(`App is listening on port: ${port}`);
});
