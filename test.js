"use strict";

// install redis first:
// https://redis.io/

// then:
// $ npm install redis
// $ redis-server

var express = require("express");
var session = require("express-session");

var app = express();

// app.set("trust proxy", true);
// Populates req.session
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: "keyboard cat",
    cookie: { secure: true },
  })
);

app.get("/", function (req, res) {
  var body = "";
  if (req.session.views) {
    ++req.session.views;
  } else {
    req.session.views = 1;
    body += "<p>First time visiting? view this page in several browsers :)</p>";
  }
  req.session.user = "dika";
  req.session.password = "halo";
  res.send(
    body + "<p>viewed <strong>" + req.session.views + "</strong> times.</p>"
  );
  // console.log(req.session);
});

app.get("/test", function (req, res) {
  res.send("" + req.session.user);
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log("Express started on port 3000");
}
