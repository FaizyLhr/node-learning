const express = require("express");
const app = express();
const appDef = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

// require("dotenv").config();
require("dotenv").config();

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

app.listen(port, () => {
	console.log(`App is listening on port: ${port}`);
});
