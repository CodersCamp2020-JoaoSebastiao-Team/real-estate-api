import nodemailer from 'nodemailer';
//import juice from 'juice';
//import htmlToText from 'html-to-text';
import {promisify} from 'es6-promisify';

// TODO const generateHTML = (filename, options={})

let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3452947490dbe5", // generated ethereal user
      pass: '23dadd2547b106', // generated ethereal password
    },
  });

exports.send = async (options: any) => {
  const mailOptions = {
    from: 'Real estate <re@noreply.com',
    to: options.user.email,
    subject: options.subject,
    html: 'later',
    text: 'later',
  }
  const sendMail = promisify(transport.sendMail);
  return sendMail(mailOptions);
}