const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SG_API_KEY);


function sendWelcomeEmail(name, emailAddress) {
    sgMail.send({
        to: emailAddress,
        from: 'noreply@mmybo.com',
        subject: 'Welcome to MMYBO!',
        html: `<h2>Hi, ${name}!</h2><h3>We've successfully created your account on MMYBO.</h3>`,
    });
}

module.exports = { sendWelcomeEmail };