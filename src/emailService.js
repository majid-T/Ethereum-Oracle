const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    // service: 'gmail',
    auth: {
        user: 'majid.dev.shockoohi@gmail.com',
        pass: 'ThisIsFake123'
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