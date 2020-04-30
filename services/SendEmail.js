const nodemailer = require("nodemailer");
const orderTemplate = require("./emailTemplates/newOrder");
const keys = require("../config/keys");

module.exports = (order) => {
  const { firstName, lastName, email, _id } = order;
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: keys.googleUserName,
      pass: keys.googlePass,
    },
  });

  const message = {
    from: "stevebaloghdronephotos@gmail.com",
    to: email,
    bcc: "stevebaloghdronephotos@gmail.com",
    subject: `Order confirmed, placed by ${firstName} ${lastName}`,
    html: orderTemplate(order),
  };

  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
