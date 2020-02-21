module.exports = app => {
  app.get("/api/hi", (req, res) => {
    res.send({ hi: "thereeee" });
  });
};
