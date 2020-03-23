const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const checkAdmin = require("../middlewares/checkAdmin");

module.exports = app => {
  app.post("/api/adminLogin", async (req, res) => {
    const { password } = req.body;
    try {
      if (password == keys.adminPassword) {
        const payload = { admin: true };
        const token = jwt.sign(payload, keys.secret, {
          expiresIn: "12h"
        });
        res.cookie("token", token, { httpOnly: true }).sendStatus(200);
      } else {
        res.status(401).json({
          error: "Incorrect password"
        });
      }
    } catch (err) {
      res.send(err);
    }
  });

  app.get("/api/checkToken", checkAdmin, function(req, res) {
    res.sendStatus(200);
  });
};
