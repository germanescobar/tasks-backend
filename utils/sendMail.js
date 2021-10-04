require('dotenv').config()
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

/**
 * Send an email
 * @param {string} to - The email address to send to
 * @param {string} subject - The subject of the email
 * @param {html} html -The html of the email
 */
function sendMail({to, subject, template_id, dynamic_template_data = {}}) {
  const msg = {
    to, // Change to your recipient
    from: 'Cristian Moreno <cristian.moreno@makeitreal.camp>', // Change to your verified sender
    subject,
    template_id,
    dynamic_template_data,
  }

  return sgMail.send(msg)

  // create reusable transporter object using the default SMTP transport
  // const transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true, // true for 465, false for other ports
  //   auth: {
  //     user: process.env.STMP_SERVER_USER,
  //     pass: process.env.STMP_SERVER_PASSWORD,
  //   },
  // });

  // // send mail with defined transport object
  // return transporter.sendMail({
  //   from: '"Dev one " <khriztianmoreno@gmail.com>', // sender address
  //   to, // list of receivers
  //   subject, // Subject line
  //   html,
  //   // attachments: [
  //   //   {
  //   //     filename: 'logo.png',
  //   //     path: 'brand.png',
  //   //   }]
  // });
}

// sendMail()

module.exports = sendMail
