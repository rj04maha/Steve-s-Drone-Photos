const mongoose = require("mongoose");
const Order = mongoose.model("orders");
const SendEmail = require("../services/SendEmail");
const checkAdmin = require("../middlewares/checkAdmin");

module.exports = (app) => {
  // Create order
  app.post("/api/orders", async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      addr1,
      addr2,
      city,
      state,
      zip,
      payment,
      total,
      photos,
      customerNote,
    } = req.body;

    const order = new Order({
      firstName,
      lastName,
      email,
      phone,
      addr1,
      addr2,
      city,
      state,
      zip,
      payment,
      total,
      photos,
      customerNote,
      datePlaced: Date.now(),
    });

    try {
      const newOrder = await order.save();
      await SendEmail(newOrder);
      res.send(newOrder);
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  });

  app.get("/api/orders", checkAdmin, async (req, res) => {
    try {
      const allOrders = await Order.find();
      res.send(allOrders);
    } catch (err) {
      res.send(err.message);
    }
  });

  // Fetch order by id
  app.get("/api/orders/:id", checkAdmin, async (req, res) => {
    try {
      const orderMatch = await Order.findById(req.params.id).exec();
      res.send(orderMatch);
    } catch (err) {
      res.status(422).send("Order cannot be found");
    }
  });

  // Update order by id
  app.put("/api/orders/:id", checkAdmin, async (req, res) => {
    var { fullfilled, paid } = req.body;

    try {
      const foundOrder = await Order.findById(req.params.id).exec();
      if (!fullfilled) {
        fullfilled = foundOrder.fullfilled;
      }
      if (!paid) {
        paid = foundOrder.paid;
      }

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
      //res.send(err.message);
      return;
    }
  });

  /*   app.delete("/api/orders/:id", checkAdmin, async (req, res) => {
    try {
      await Order.findOneAndDelete({ _id: req.params.id });
      res.send("Order deleted");
    } catch (err) {
      res.status(422).send("There was a problem deleting this order.");
    }
  }); */
};
