const express = require("express");
const passport = require("passport");
const path = require("path");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post(
	"/signup",
	passport.authenticate("signup", { session: false }),
	async (req, res, next) => {
		res.json({
			message: "Signup successful",
			user: req.user,
		});
	}
);

router.post("/login", async (req, res, next) => {
	passport.authenticate("login", async (err, user, info) => {
		try {
			if (err || !user) {
				const error = new Error("An error occurred.");

				return next(error);
			}

			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);

				const body = { _id: user._id, email: user.email };
				const token = jwt.sign({ user: body }, "TOP_SECRET");

				// console.log(__dirname);
				// res.sendFile(__dirname + "/static/login.html");
				// res.sendFile("../htmlPages/login.html");
				return res.json({ token });
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});

module.exports = router;
