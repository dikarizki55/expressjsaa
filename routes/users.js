const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("user list");
});

router.get("/new", (req, res) => {
  res.send("Users new form");
});

router.post("/", (req, res) => {
  res.send("Created User");
});

router
  .route("/:id")
  .get((req, res) => {
    res.send(`User Get Id ${req.params.id}, halo bro ${req.user.name}`);
  })
  .put((req, res) => {
    res.send("edit users");
  })
  .delete((req, res) => {
    res.send("delete users");
  });

const users = [{ name: "kalo" }, { name: "siapa" }];
router.param("id", (req, res, next, id) => {
  req.user = users[id];
  //   console.log(id);
  next();
});

module.exports = router;
