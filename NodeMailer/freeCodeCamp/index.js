const express = require("express");
const app = express();

const nodemailer = require("nodemailer");

const port = process.env.PORT || 3000;

app.use("/sendmail", () => {
	const { receiver, subject, message } = req.body;

	let messageToSend = {
		from: "Your email",
		to: receiver,
		subject: subject,
		text: message,
		html: "<h1>Welcome</h1><p>That was easy!</p>",
		// Using Path
		html: { path: "app/public/pages/emailWithPDF.html" },
		// Using HandleBars
		html: "<p>Hello {{username}}</p>",
	};

	// let mailOptions = {
	// 	from: "youremail@gmail.com",
	// 	to: "myfriend@yahoo.com, myotherfriend@yahoo.com",
	// 	subject: "Sending Email using Node.js",
	// 	text: "That was easy!",
	// };

	// let transporter = nodemailer.createTransport({
	// 	service: "gmail",
	// 	auth: {
	// 		user: "youremail@gmail.com",
	// 		pass: "your password",
	// 	},
	// });

	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "Your email",
			pass: "Your Password",
		},
	});

	transporter.sendMail(messageToSend, function (error, info) {
		if (error) {
			console.log(error);
			res.status(421).send({
				message: "Something went wrong check out data and send again",
			});
		} else {
			console.log("Email sent: " + info.response);
		}
	});

	// transporter.sendMail(messageToSend, (err, info) => {
	// 	if (err)
	// 		res.status(421).send({
	// 			message: "Something went wrong check out data and send again",
	// 		});
	// 	else res.status(200).send({ message: "Email sent successfully" });
	// });
});

app.listen(port, () => {
	console.log(`App is listening on port: ${port}`);
});
