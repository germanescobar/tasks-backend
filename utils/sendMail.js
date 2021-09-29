const nodemailer = require('nodemailer');

/**
 * Send an email
 * @param {string} to - The email address to send to
 * @param {string} subject - The subject of the email
 * @param {html} html -The html of the email
 */
function sendMail({to, subject, html, attachments}) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.STMP_SERVER_USER,
      pass: process.env.STMP_SERVER_PASSWORD,
    },
  });

  // send mail with defined transport object
  return transporter.sendMail({
    from: '"Dev one " <khriztianmoreno@gmail.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    html,
    // attachments: [
    //   {
    //     filename: 'logo.png',
    //     path: 'brand.png',
    //   }]
  });
}

module.exports = sendMail
