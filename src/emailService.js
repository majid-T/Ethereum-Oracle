const nodemailer = require('nodemailer');
require('dotenv').config()


const GMAIL_PASS = process.env.GMAIL_PASS;
const GMAIL_ACCOUNT = process.env.GMAIL_ACCOUNT;


let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    // service: 'gmail',
    auth: {
        user: GMAIL_ACCOUNT,
        pass: GMAIL_PASS
    }
});

const message = {
    from: 'majid.dev.shockoohi@gmail.com', // Sender address
    to: 'majid.shockoohi@gmail.com',         // List of recipients
    subject: 'Testing nodemailer', // Subject line
    html: '<h1>Nice module you are using</h1><p>Thank you for using this account</p>' // Plain text body
};


transport.sendMail(message, function (err, info) {
    if (err) {
        console.log(err)
    } else {
        console.log(info);
    }
});