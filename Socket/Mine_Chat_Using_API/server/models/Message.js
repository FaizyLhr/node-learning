var mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema(
	{
		text: String,
		SentBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
