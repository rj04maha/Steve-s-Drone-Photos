const mongoose = require("mongoose");
const Photo = mongoose.model("photos");
const checkAdmin = require("../middlewares/checkAdmin");
const cloudinary = require("cloudinary").v2;
const keys = require("../config/keys");
//const multer = require("../services/mutler");
const multer = require("multer");
const path = require("path");
const Jimp = require("jimp");

cloudinary.config({
  cloud_name: keys.cloudinary_cloud_name,
  api_key: keys.cloudinary_api_key,
  api_secret: keys.cloudinary_api_secret,
});

var date = Date.now();
//

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}-${date}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
}).single("image");

module.exports = (app) => {
  app.post("/api/photos", checkAdmin, upload, async (req, res) => {
    try {
      name = req.body["name"];
      tags = req.body["tags"];
      location = req.body["location"];
      dateTaken = req.body["dateTaken"];
      //const imagePath = req.file.path;

      if (req.file.size >= 10000000) {
        const image = await Jimp.read(req.file.path);
        await image.resize(1600, Jimp.AUTO);
        await image.writeAsync(req.file.path);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: name,
        transformation: [
          { opacity: 100 },
          {
            angle: 320,
            flags: "tiled",
            overlay: "droneoutline-removebg-preview_yyz4hw",
            opacity: 40,
            width: 1000,
            zoom: 1,
            crop: "scale",
          },
        ],
      });
      source = result.url;

      const photo = new Photo({
        name,
        tags: tags.split(",").map((tag) => tag.trim()),
        location,
        source,
        dateTaken,
        dateAdded: Date.now(),
      });

      const newPhoto = await photo.save();

      res.send(newPhoto);
    } catch (err) {
      res.status(422).send(`There was a problem uploading this photo: ${err}`);
    }
  });

  app.get("/api/photos", async (req, res) => {
    try {
      const allPhotos = await Photo.find();
      res.send(allPhotos);
    } catch (err) {
      res.status(422).send(err.message);
    }
  });

  app.get("/api/photos/:id", async (req, res) => {
    try {
      const photoMatch = await Photo.findById(req.params.id).exec();
      res.send(photoMatch);
    } catch (err) {
      res.status(422).send("Photo cannot be found: " + err);
    }
  });

  app.delete("/api/photos/:id", checkAdmin, async (req, res) => {
    try {
      const photoMatch = await Photo.findById(req.params.id).exec();
      cloudinary.uploader.destroy(photoMatch.name);
      await Photo.findOneAndDelete({ _id: req.params.id });
      res.send("Photo deleted");
    } catch (err) {
      res.status(422).send("There was a problem deleting this photo: " + err);
    }
  });

  app.put("/api/photos/:id", checkAdmin, async (req, res) => {
    var { name, tags, location, dateTaken } = req.body;

    if (typeof tags === "string") {
      tags = tags.split(",").map((tag) => tag.trim());
    }

    try {
      await Photo.updateOne(
        { _id: req.params.id },
        {
          $set: {
            name: name,
            tags: tags,
            location: location,
            dateTaken: dateTaken,
          },
        }
      ).exec();
      res.status(202).send("Updated successfully");
    } catch (err) {
      res.status(422).send("There was a problem updating this photo: " + err);
    }
  });
};
