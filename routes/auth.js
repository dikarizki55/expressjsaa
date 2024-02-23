const express = require("express");
const router = express.Router();
const connect = require("../config/connect");
const bcrypt = require("bcrypt");

router
  .route("/login")
  .get((req, res) => {
    res.render("auth/login");
  })
  .post((req, res) => {
    connect.query(
      "SELECT * FROM user WHERE username = ?",
      req.body.username,
      (err, rows, field) => {
        if (err) {
          res.status(500).json({ message: "ada kesalahan", error: err });
        } else {
          if (rows.length > 0) {
            const match = bcrypt.compare(req.body.password, rows[0].password);
            if (match) {
              req.session.loggedin = true;
              req.session.username = rows[0].username;
              res.redirect(req.session.urlbefore || "/");
            } else {
              res.send("password salah");
            }
          }
        }
      }
    );
  });

router
  .route("/signup")
  .get((req, res) => {
    res.render("auth/signup");
  })
  .post(async (req, res) => {
    const data = { ...req.body };
    const query = "INSERT INTO user (username, password) VALUES (?,?)";

    const hashPassword = await bcrypt.hash(data.password, 10);

    connect.query(query, [data.username, hashPassword], (err, rows, field) => {
      if (err) {
        res.status(500).json({ message: "gagal insert data", error: err });
      } else {
        res.redirect("/auth/login");
      }
    });
  });

router.route("/logout").get((req, res) => {
  req.session.destroy((err) => {
    res.redirect("/auth/login");
  });
});

const isLogin = require("../middleware/isLogin");

router.route("/usermanager").get(isLogin, (req, res) => {
  connect.query("SELECT * FROM user", (err, rows) => {
    if (err) {
      res.status(500).json({ message: "error", error: err });
    } else {
      if (rows.length > 0) {
        res.render("auth/usermanager", { data: rows });
      } else {
        res.status(500).json({ message: "error", error: err });
      }
    }
  });
});

module.exports = router;
