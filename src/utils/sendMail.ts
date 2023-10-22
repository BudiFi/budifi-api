import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
	host: "sandbox.smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "5da32c4fdaa82c",
		pass: "40560ca82d4b4b",
	},
});

export const sendEmail = (
	recipientEmail: string,
	recipientName: string,
	subject: string,
	senderName: string,
	senderEmail: string,
	mailContent: any
) => {
	transport.sendMail({
		text: "Welcome to Mailtrap Sending!",
		to: {
			address: recipientEmail,
			name: recipientName,
		},
		from: {
			address: senderEmail,
			name: senderName,
		},
		subject: subject,
		html: mailContent,
	});
};