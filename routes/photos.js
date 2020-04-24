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
  api_secret: keys.cloudinary_api_secret,
});

var date = Date.now();
//  destination: "./public/uploads/",

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}-${date}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
}).single("image");

module.exports = (app) => {
  app.post("/api/photos", upload, async (req, res) => {
    try {
      name = req.body["name"];
      tags = req.body["tags"];
      location = req.body["location"];
      dateTaken = req.body["dateTaken"];

      console.log("here is my console log!!");
      console.log(req.file.path);

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

      console.log("here is the result: ~~~");
      console.log(result);

      const photo = new Photo({
        name,
        tags: tags.split(",").map((tag) => tag.trim()), //: tags.split(",").map(tag => ({ tag: tag.trim() })),
        location,
        source,
        dateTaken,
        dateAdded: Date.now(),
      });

      const newPhoto = await photo.save();

      console.log("here is the new photo: ~~~");
      console.log(newPhoto);
      res.send(newPhoto);
    } catch (err) {
      res.send(`There was a problem uploading this photo: ${err}`);
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

  app.delete("/api/photos/:id", async (req, res) => {
    try {
      const photoMatch = await Photo.findById(req.params.id).exec();
      console.log(photoMatch.name);
      cloudinary.uploader.destroy(photoMatch.name);
      await Photo.findOneAndDelete({ _id: req.params.id });
      res.send("Photo deleted");
    } catch (err) {
      res.status(422).send("There was a problem deleting this photo.");
    }
  });

  app.put("/api/photos/:id", async (req, res) => {
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
      console.log(err);
      res.status(422).send("There was a problem updating this photo");
    }
  });
};
