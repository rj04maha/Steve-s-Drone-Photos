const mongoose = require("mongoose");
const Order = mongoose.model("orders");
const orderTemplate = require("../services/emailTemplates/newOrder");
const nodemailer = require("nodemailer");
const keys = require("../config/keys");

module.exports = app => {
  // Create order
  app.post("/api/orders", async (req, res) => {
    const { firstName, lastName, email, phone, photos, note } = req.body;

    const order = new Order({
      firstName,
      lastName,
      email,
      phone,
      datePlaced: Date.now(),
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
      from: "stevebaloghdronephotos@gmail.com",
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

  app.get("/api/orders", async (req, res) => {
    const allOrders = await Order.find();
    res.send(allOrders);
  });

  // Fetch order by id

  app.get("/api/order_id", async (req, res) => {
    try {
      const orderMatch = await Order.findById(req.query.id).exec();
      res.send(orderMatch);
    } catch (err) {
      res.send(err);
    }
  });

  // Update order by id
  app.put("/api/orders_id", async (req, res) => {
    const { orderId, fullfilled, paid } = req.body;

    try {
      await Order.updateOne(
        { _id: orderId },
        { $set: { fullfilled: fullfilled, paid: paid } }
      ).exec();
      res.sendStatus(200);
    } catch (err) {
      res.send(err);
    }
  });

  app.delete("/api/orders/:id", async (req, res) => {
    const { orderId, fullfilled, paid } = req.body;

    //delete order
  });

  /* app.get("/api/order_first", async (req, res) => {
    try {
      const orderMatch = await Order.find({
        firstName: req.query.first
      }).collation({ locale: "en", strength: 2 });
      res.send(orderMatch);
    } catch (err) {
      res.send(422).send(err);
    }
  });

  app.get("/api/order_last", async (req, res) => {
    try {
      const orderMatch = await Order.find({
        lastName: req.query.last
      }).collation({ locale: "en", strength: 2 });
      res.send(orderMatch);
    } catch (err) {
      res.send(422).send(err);
    }
  }); */
};
