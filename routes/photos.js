const mongoose = require("mongoose");
const Photo = mongoose.model("photos");
const checkAdmin = require("../middlewares/checkAdmin");
const cloudinary = require("cloudinary").v2;
const keys = require("../config/keys");
//const multer = require("../services/mutler");
const multer = require("multer");
const path = require("path");

cloudinary.config({
  cloud_name: keys.cloudinary_cloud_name,
  api_key: keys.cloudinary_api_key,
  api_secret: keys.cloudinary_api_secret
});

var date = Date.now();

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(null, `${file.originalname}-${date}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage
}).single("image");

module.exports = app => {
  app.post("/api/photos", upload, async (req, res) => {
    try {
      name = req.body["name"];
      tags = req.body["tags"];
      description = req.body["description"];

      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: name,
        tags: tags
      });
      source = result.public_id;

      const photo = new Photo({
        name,
        tags: tags.split(",").map(tag => tag.trim()), //: tags.split(",").map(tag => ({ tag: tag.trim() })),
        description,
        source,
        dateAdded: Date.now()
      });

      const newPhoto = await photo.save();
      res.send(newPhoto);
    } catch (err) {
      res.send(`There was a problem uploading this photo: ${err.message}`);
    }
  });

  app.get("/api/photos", async (req, res) => {
    try {
      const allPhotos = await Photo.find();
      res.send(allPhotos);
    } catch (err) {
      res.send(err.message);
    }
  });

  app.get("/api/photos/:id", async (req, res) => {
    try {
      const photoMatch = await Photo.findById(req.params.id).exec();
      res.send(photoMatch);
    } catch (err) {
      res.status(422).send("Photo cannot be found");
    }
  });

  app.delete("/api/photos/:id", checkAdmin, async (req, res) => {
    try {
      //cloudinary.v2.uploader.destroy(public_id);
      await Photo.findOneAndDelete({ _id: req.params.id });
      res.send("Photo deleted");
    } catch (err) {
      res.status(422).send("There was a problem deleting this photo.");
    }
  });
};
