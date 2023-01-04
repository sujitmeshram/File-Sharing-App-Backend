// https://www.geeksforgeeks.org/how-to-send-email-with-nodemailer-using-gmail-account-in-node-js/

const nodemailer = require("nodemailer");
module.exports = async ({ from, to, subject, text, html }) => {
  //passing configuration and using sendinblue.com SMTP

  //   https://app.sendinblue.com/settings/keys/smtp
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object, sendMail is nodemailer method
  let info = await transporter.sendMail({
    from: `File Sharing App <${from}>`, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // html body
  });
};
