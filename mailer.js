const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function sendEmailReport(reportData) {
    const filePath = path.join(__dirname, 'templates', 'report.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();

    const template = handlebars.compile(source);

    const dataToSend = {
        date: new Date().toLocaleString(),
        sites: reportData,
    };

    const htmlToSend = template(dataToSend);
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECEIVER,
        subject: 'Sentinel updates',
        html: htmlToSend,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendEmailReport };