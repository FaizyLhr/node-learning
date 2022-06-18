const express = require("express");
const router = express.Router();
const path = require("path");

const MessageModel = require("../../models/Message");

const { getUser } = require("../middleWares/getUser");

router.get("/", function (req, res, next) {
	res.send("Router Home");
});

//send Message
router.post("/:fid/addMessage", getUser, async (req, res) => {
	try {
		console.log(req.body.text);
		const reqText = req.body.text;

		// console.log(req.body);

		if (!reqText) {
			res.status(400).send("Text Not Entered");
		}

		// Create user in our database
		const msg = await MessageModel.create({
			text: reqText,
		});
		msg.SentBy = req.user._id;
		msg.save();
		res.status(201).send(msg);
	} catch (e) {
		console.log(e);
	}
});

//Del Message
router.put("/:fid/delMessage/:_id", getUser, async (req, res) => {
	const _id = req.params._id;
	MessageModel.findByIdAndDelete({ _id })
		.then((user) => {
			console.log("Message Deleted");
			res.status(202).send(user);
		})
		.catch((e) => {
			console.log(e);
		});
});

// View All Message By User
router.get("/:fid/messages", getUser, async (req, res) => {
	// console.log(req.user);
	const reqID = req.user._id;
	MessageModel.find({ sentBy: reqID })
		.then((msgs) => {
			return res.status(200).send(msgs);
		})
		.catch((err) => {
			return res.status(500).send(err);
		});
});

module.exports = router;
