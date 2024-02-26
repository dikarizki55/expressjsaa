// const express = require("express");
// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello New World!");
// });
// app.get("/test", (req, res) => {
//   res.send("Hello TEST!");
// });

// app.get("/error", (req, res) => {
//   res.json({ message: "error" });
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

const express = require("express");
const BodyParser = require("body-parser");
const app = express();
const session = require("express-session");

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// app.use(logger);
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "misalnya",
    cookie: {
      // maxAge: 5000,
    },
  })
);

app.get("/", (req, res) => {
  // res.send("hallo dunia");
  // res.render("index", { test: "bisadong" });
  res.redirect("/product");
});

// app.use(logger);

const useRouter = require("./routes/users");
app.use("/users", useRouter);

const isLogin = require("./middleware/isLogin");
const productRouter = require("./routes/product");
app.use("/product", isLogin, productRouter);

const auth = require("./routes/auth");
app.use("/auth", auth);

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

app.listen(3000);
