const mongoose = require("mongoose");
const Order = mongoose.model("orders");
const orderTemplate = require("../services/emailTemplates/newOrder");
const nodemailer = require("nodemailer");
const keys = require("../config/keys");

module.exports = app => {
  app.post("/api/submitOrder", async (req, res) => {
    const { firstName, lastName, email, photos, note } = req.body;

    const order = new Order({
      firstName,
      lastName,
      email,
      dateAdded: Date.now(),
      photos,
      note
    });

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
      from: "orders@stevesdronepics.com",
      to: email,
      bcc: "stevebaloghdronephotos@gmail.com",
      subject: `New order placed by ${firstName} ${lastName}`,
      html: orderTemplate(order)
    };

    transporter.sendMail(message, function(err, info) {
      if (err) {
        res.send(422).send(err);
        console.log(err);
      } else {
        console.log(info);
      }
    });

    try {
      const newOrder = await order.save();
      res.send(newOrder);
    } catch (err) {
      res.send(422).send(err);
    }
  });
};
