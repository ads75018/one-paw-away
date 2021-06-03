const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;

router.get("/about", (req, res, next) => res.render("about.hbs"));

router.get("/profile", (req, res, next) => res.render("profile.hbs"));

router.get("/classifieds", (req, res, next) => {
  res.render("classifieds.hbs", {
    isClassfieds: true,
  })
});

// router.get("/login", (req, res, next) => {
//   res.render("auth/login", {
//     isLogin: true,
//   });
// });

// router.get('/login', (req, res, next) => res.render ("login", {
//   isLogin: true
// }))
