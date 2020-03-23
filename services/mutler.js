var multer = require("multer");

module.exports = () => {
  const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function(req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now}${path.extname(file.originalName)}`
      );
    }
  });

  const upload = multer({
    storage: storage
  }).single("image");
};
