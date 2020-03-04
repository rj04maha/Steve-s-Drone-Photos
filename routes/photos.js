const mongoose = require("mongoose");
const checkAdmin = require("../middlewares/checkAdmin");

const Photo = mongoose.model("photos");

module.exports = app => {
  app.post("/api/addPhoto", checkAdmin, async (req, res) => {
    const { id, source, tags } = req.body;

    const photo = new Photo({
      id,
      source,
      tags: tags.split(",").map(tag => ({ tag: tag.trim() })),
      dateAdded: Date.now()
    });

    try {
      const newPhoto = await photo.save();
      res.send(newPhoto);
    } catch (err) {
      res.send(422).send(err);
    }
  });
};
