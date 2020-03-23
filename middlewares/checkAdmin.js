const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const checkAdmin = function(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, keys.secret, function(err) {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        //req.email = decoded.email; // continue
        next();
      }
    });
  }
};
module.exports = checkAdmin;
