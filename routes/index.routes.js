const express = require("express");
const router = express.Router();

const User = require("../models/User.model");


function ensureIsLogged(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
}

// /* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;

router.get("/about", (req, res, next) => res.render("about.hbs"));

router.get("/profile", ensureIsLogged, (req, res, next) => {
  console.log("message", req.session.currentUser);
  User.findById(req.session.currentUser._id)
    .then((user) => {
      console.log("ici=>", user);
      res.render("profile.hbs", { user });
      user.simpleDate = user.birthday.toISOString().split("T")[0];
    })
    .catch((error) => {
      console.log("Error while getting the Doggos from DB:", error);
      next(error);
    });
});

router.post("/profile", (req, res, next) => {
  console.log('oi',req.body.location )
  console.log("oi", req.body.location)
  User.findByIdAndUpdate(req.session.currentUser._id, {

    location: req.body.location,
    important: req.body.important,
    bio: req.body.bio,
  })
    .then((user) => res.redirect("/profile"))
    .catch((err) => next(err));
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

router.get("/classifieds", ensureIsLogged, (req, res, next) => {
  User.find()
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
