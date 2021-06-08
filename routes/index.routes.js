const express = require("express");
const router = express.Router();

const User = require("../models/User.model");



// /* GET home page */
 router.get("/", (req, res, next) => {
   res.render("index");
 });

module.exports = router;

router.get("/about", (req, res, next) => res.render("about.hbs"));

router.get("/profile", (req, res, next) => {
  console.log('message', req.session.currentUser)
  User.findById(req.session.currentUser._id)
    .then((user) => {
      console.log('ici=>',user);
      res.render("profile.hbs", {user});
      // user.simpleDate = user.birthday.toISOString().split('T')[0]
    })
    .catch((error) => {
      console.log("Error while getting the Doggos from DB:", error);
      next(error);
    });
});


// router.get("/profile", (req, res, next) => {
//   User.findOne({_id: req.params.id})
//     .then((user) => {
//       console.log('this is:',user);
//       res.render("profile.hbs", {user});
//       // user.simpleDate = user.birthday.toISOString().split('T')[0]
//     })
//     .catch((error) => {
//       console.log("Error while getting the Doggos from DB:", error);
//       next(error);
//     });
// });

router.get("/classifieds", (req, res, next) => {
  User.find()
    .then((allTheDoggosFromDB) => {
      console.log(allTheDoggosFromDB[0]);
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

router.get("/classifieds-doggo", (req, res, next) => {
  User.find()
    .then((allTheDoggosFromDB) => {
      console.log(allTheDoggosFromDB[0]);
      res.render("classifieds-doggo.hbs", {
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
