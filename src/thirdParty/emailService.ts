import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
	host: "sandbox.smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "5da32c4fdaa82c",
		pass: "40560ca82d4b4b",
	},
});

export const sendEmail = async (recipientEmail: string, recipientName: string, subject: string, mailContent: any) => {
	await transport.sendMail({
		text: "Welcome to Mailtrap Sending!",
		to: {
			address: recipientEmail,
			name: recipientName,
		},
		from: {
			address: "support@budifi.com",
			name: "BudiFi",
		},
		subject: subject,
		html: mailContent,
	});
};
