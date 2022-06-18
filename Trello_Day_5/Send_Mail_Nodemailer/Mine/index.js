/*
    Don't forget to disable less secure app from Gmail: https://myaccount.google.com/lesssecureapps 
*/

require("dotenv").config();

const nodemailer = require("nodemailer");

// console.log(process.env.EMAIL);
// console.log(process.env.PASSWORD);
// Step 1
// let transporter = nodemailer.createTransport("SMTP", {
let transporter = nodemailer.createTransport({
	service: "Gmail",
	// host: "smtp.gmail.com",
	// port: 587,
	// secure: false,
	auth: {
		user: process.env.EMAIL || "chegiaco@gmail.com", // TODO: your gmail account
		pass: process.env.PASSWORD || "faizy123", // TODO: your gmail password
	},
});

// Step 2
let mailOptions = {
	from: "chegiaco@gmail.com", // TODO: email sender
	to: "mhmdfeezan4@gmail.com,mfeezanlhr@gmail.com", // TODO: email receiver
	subject: "Nodemailer - Test",
	text: "Boohoo it works!!",
	html: "<h1>Faizy Achieved It</h1>",
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
	if (err) {
		console.log(err);
		return console.log("Error occurs");
	}
	return console.log("Email sent!!!");
});
