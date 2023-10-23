"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport = nodemailer_1.default.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "5da32c4fdaa82c",
        pass: "40560ca82d4b4b",
    },
});
const sendEmail = (recipientEmail, recipientName, subject, senderName, senderEmail, mailContent) => {
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
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendMail.js.map