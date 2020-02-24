const nodemailer = require("nodemailer");

class Mailer extends Object {
  constructor({ subject, email }, content) {
    super();

    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "43ea8e1951df2e",
        pass: "5e4879865c3b25"
      }
    });
    const message = {
      from: "orders@stevesdronepics.com",
      to: email,
      subject: subject,
      html: content
    };
    transport.sendMail(html, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  }
}

module.exports = Mailer;
