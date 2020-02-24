module.exports = (req, res, next) => {
  if (!req.admin) {
    return res.status(401).send({ error: "Admin access only" });
  }
  next();
};
