const MessageModel = require("../../models/Message");

const addMessage = async function (req, res) {
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
};

module.exports = addMessage;
