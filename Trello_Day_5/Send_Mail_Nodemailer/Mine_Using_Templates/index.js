/*
    Don't forget to disable less secure app from Gmail: https://myaccount.google.com/lesssecureapps TODO:
*/

require("dotenv").config();

const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

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
transporter.use(
	"compile",
	hbs({
		viewEngine: {
			// extname: ".hbs", // handlebars extension
			// layoutsDir: "templates/views", // location of handlebars templates
			// defaultLayout: "main", // name of main template
			defaultLayout: false, // disable defaultLayout
			// partialsDir: "views/email/", // location of your subtemplates aka. header, footer etc
		},
		viewPath: "templates/views/",
		extName: ".hbs",
	})
);

// Step 3
let mailOptions = {
	from: "chegiaco@gmail.com", // TODO: email sender
	to: "mhmdfeezan4@gmail.com", // TODO: email receiver
	subject: " Faizy  Test",
	template: "index",
	context: {
		name: "Faizy",
	}, // send extra values to template
};
// console.log(transporter);

// Step 4
transporter.sendMail(mailOptions, (err, data) => {
	// console.log(mailOptions);
	// console.log(mailOptions.template);
	if (err) {
		console.log(err);
		return console.log("Error occurs");
	}
	return console.log("Email sent!!!");
});
