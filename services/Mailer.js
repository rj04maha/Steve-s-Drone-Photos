const nodemailer = require("nodemailer");
const orderTemplate = require("../services/emailTemplates/newOrder");
const keys = require("../config/keys");

class Mailer extends Object {
  constructor({ firstName, lastName, email }) {
    super();

    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: keys.googleUserName,
        pass: keys.googlePass
      }
    });

    const message = {
      from: "stevebaloghdronephotos@gmail.com",
      to: email,
      bcc: "stevebaloghdronephotos@gmail.com",
      subject: `New order placed by ${firstName} ${lastName}`,
      html: orderTemplate(order)
    };

    async function send() {
      transporter.sendMail(message, function(err, info) {
        if (err) {
          res.send(422).send(err);
          console.log(err);
        } else {
          console.log(info);
        }
      });
    }

    /*     transporter.sendMail(message, function(err, info) {
      if (err) {
        res.send(422).send(err);
        console.log(err);
      } else {
        console.log(info);
      }
    }); */
  }
}

module.exports = Mailer;
