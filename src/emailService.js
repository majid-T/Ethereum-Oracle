const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '5cca5f002ffa14',
        pass: 'd6e9fe7c8f6d0e'
    }
});

const message = {
    from: 'majid@company.co', // Sender address
    to: 'customer@email.com',         // List of recipients
    subject: 'Testing nodemailer', // Subject line
    html: '<h1>Nice module you are using</h1><p>Thank you for using ou account</p>' // Plain text body
};


transport.sendMail(message, function (err, info) {
    if (err) {
        console.log(err)
    } else {
        console.log(info);
    }
});