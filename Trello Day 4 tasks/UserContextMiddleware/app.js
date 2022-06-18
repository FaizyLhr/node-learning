require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const auth = require("./middleware/auth");

// const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// mongoose
// 	// .connect(MONGO_URI, {
// 	.connect("mongodb://localhost:27017/authdb", {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 		// useCreateIndex: true,
// 		// useFindAndModify: false,
// 	})
// 	.then(() => {
// 		console.log("Successfully connected to database");
// 	})
// 	.catch((error) => {
// 		console.log("database connection failed. exiting now...");
// 		console.error(error);
// 		process.exit(1);
// 	});
// Logic goes here

// importing user context

const User = require("./model/user");

// Register
app.post("/register", async (req, res) => {
	// our register logic goes here...
	try {
		// Get user input
		const { first_name, last_name, email, password } = req.body;

		// Validate user input
		if (!(email && password && first_name && last_name)) {
			res.status(400).send("All input is required");
			// console.log("All input is required");
		}

		// check if user already exist
		// Validate if user exist in our database
		const oldUser = await User.findOne({ email });

		if (oldUser) {
			// console.log("User Already Exist. Please Login");
			return res.status(409).send("User Already Exist. Please Login");
		}

		//Encrypt user password
		encryptedPassword = await bcrypt.hash(password, 10);

		// Create user in our database
		const user = await User.create({
			first_name,
			last_name,
			email: email.toLowerCase(), // sanitize: convert email to lowercase
			password: encryptedPassword,
		});

		// Create token
		// console.log(process.env);
		// console.log(process.env.TOKEN_KEY);
		const token = jwt.sign(
			{ user_id: user._id, email },
			process.env.TOKEN_KEY,
			{
				expiresIn: "2h",
			}
		);
		// save user token
		user.token = token;

		// return new user
		res.status(201).json(user);
	} catch (err) {
		console.log(err);
	}
});

// Login
app.post("/login", async (req, res) => {
	// our login logic goes here
	try {
		// Get user input
		const { email, password } = req.body;

		// Validate user input
		if (!(email && password)) {
			res.status(400).send("All input is required");
		}
		// Validate if user exist in our database
		const user = await User.findOne({ email });

		if (user && (await bcrypt.compare(password, user.password))) {
			// Create token
			const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.TOKEN_KEY,
				{
					expiresIn: "2h",
				}
			);

			// save user token
			user.token = token;

			// user
			res.status(200).json(user);
		} else {
			res.status(400).send("Invalid Credentials");
		}
	} catch (err) {
		console.log(err);
	}
	// Our login logic ends here
});

// app.get("/welcome", (req, res) => {
// app.get("/welcome", auth, (req, res) => {
app.use("/welcome", auth, (req, res) => {
	res.status(200).send("Welcome 🙌 ");
});

module.exports = app;
