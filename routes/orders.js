const mongoose = require("mongoose");
const Order = mongoose.model("orders");
const Mailer = require("../services/Mailer");

module.exports = app => {
  // Create order
  app.post("/api/orders", async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      photos,
      customerNote
    } = req.body;

    const order = new Order({
      firstName,
      lastName,
      email,
      phone,
      datePlaced: Date.now(),
      photos,
      customerNote
    });

    //const mailer = new Mailer(order);

    try {
      const newOrder = await order.save();
      //await mailer.send();
      res.send(newOrder);
    } catch (err) {
      res.send(err.message);
    }
  });

  app.get("/api/orders", async (req, res) => {
    try {
      const allOrders = await Order.find();
      res.send(allOrders);
    } catch (err) {
      res.send(err.message);
    }
  });

  // Fetch order by id
  app.get("/api/orders/:id", async (req, res) => {
    try {
      const orderMatch = await Order.findById(req.params.id).exec();
      res.send(orderMatch);
    } catch (err) {
      res.status(422).send("Order cannot be found");
    }
  });

  // Update order by id
  app.put("/api/orders/:id", async (req, res) => {
    const { fullfilled, paid } = req.body;
    res.send(req.params.id);
    /* 
    try {
      await Order.findById(req.params.id).exec();

      try {
        await Order.updateOne(
          { _id: req.params.id },
          { $set: { fullfilled: fullfilled, paid: paid } }
        ).exec();
        res.send("Order updated");
      } catch (err) {
        res.status(422).send("There was a problem updating this order");
      }
    } catch (err) {
      res.status(422).send("Order cannot be found");
      return;
    } */
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
