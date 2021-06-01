const express = require("express");
const router = express.Router();

router.get("/mainPage", (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect("/");
  }
  res.render("main", { userInSession: req.session.currentUser });
});

module.exports = router;