const express = require("express");
const router = express.Router();

const Doggo = require("../models/User.model");

/* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

module.exports = router;

router.get("/about", (req, res, next) => res.render("about.hbs"));

router.get("/profile", (req, res, next) => {
  Doggo.find()
    .then((allTheDoggosFromDB) => {
      console.log(allTheDoggosFromDB);
      res.render("profile.hbs", { doggos: allTheDoggosFromDB });
    })
    .catch((error) => {
      console.log("Error while getting the Doggos from DB:", error);
      next(error);
    });
});

router.get("/classifieds", (req, res, next) => {
  Doggo.find()
    .then((allTheDoggosFromDB) => {
      console.log(allTheDoggosFromDB);
      res.render("classifieds.hbs", {
        isClassifieds: true,
        doggos: allTheDoggosFromDB,
      });
    })
    .catch((error) => {
      console.log("Error while getting the Doggos from DB:", error);
      next(error);
    });
});

// router.get("/login", (req, res, next) => {
//   res.render("auth/login", {
//     isLogin: true,
//   });
// });

// router.get('/login', (req, res, next) => res.render ("login", {
//   isLogin: true
// }))
