function isLogin(req, res, next) {
  if (req.session.loggedin === true) {
    next();
  } else {
    // req.session.destroy((err) => {
    // });
    req.session.urlbefore = req.originalUrl;
    res.redirect("/auth/login");
  }
}

module.exports = isLogin;
