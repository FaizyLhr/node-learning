var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	fid: String,
});

// const UserModel = mongoose.model("User", UserSchema);
// UserModel.create({
// 	fid: "faizy",
// })
// 	.then(() => {
// 		"Faizy User Created";
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

// UserModel.create({
// 	fid: "Usama",
// })
// 	.then(() => {
// 		"Usama User Created";
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

module.exports = mongoose.model("User", UserSchema);
