const express = require("express");
const router = express.Router();
const moment = require("moment");
const { render } = require("sass");

const User = require("../models/User.model");
const Message = require("../models/Message.model");

function ensureIsLogged(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
}

// /* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

router.get("/home", (req, res, next) => res.render("home.hbs"));

router.get("/about", (req, res, next) => res.render("about.hbs"));

router.get("/classifieds", (req, res, next) => res.render("classifieds.hbs"));

router.get("/doggo", (req, res, next) => res.render("doggo.hbs"));

router.get("/profile", ensureIsLogged, (req, res, next) => {
  console.log("message", req.session.currentUser);
  User.findById(req.session.currentUser._id)
    .then((user) => {
      console.log("ici=>", user);
      user.simpleDate = user.birthday.toISOString().split("T")[0];
      res.render("profile.hbs", { user });
    })
    .catch((error) => {
      console.log("Error while getting the Doggos from DB:", error);
      next(error);
    });
});

router.post("/profile", ensureIsLogged, (req, res, next) => {
  console.log("oi", req.body.location);
  console.log("oi", req.body.location);
  User.findByIdAndUpdate(req.session.currentUser._id, {
    location: req.body.location,
    important: req.body.important,
    bio: req.body.bio,
  })
    .then((user) => res.redirect("/profile"))
    .catch((err) => next(err));
});


router.get("/:id/dms", ensureIsLogged, (req, res, next) => {

  
  res.render("dm");
});


router.get("/messages", ensureIsLogged, (req, res, next) => {
  console.log(req.session.currentUser);

  User.findById(req.session.currentUser._id)
    .populate("requests")
    .populate("friends")
    .then((user) => {
      console.log("user requests", user.requests, "user friends", user.friends);
      res.render("messages", { user });
    })
    .catch((error) => next(error));
});

router.get("/classifieds", ensureIsLogged, (req, res, next) => {
  User.find({})
    .then((allTheDoggosFromDB) => {
      // [ {_id: , ... , age:  }, {}, ... ]
      for (let i = 0; i < allTheDoggosFromDB.length; i++) {
        const doggo = allTheDoggosFromDB[i]
        doggo.age = moment(allTheDoggosFromDB[i].birthday).format('LL');
        console.log(doggo.age)
      }
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

<<<<<<< HEAD
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
=======
router.get("/doggos/:id/send-bone", (req, res, next) => {
  console.log("oi:", req.params.id);
  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      requests: req.session.currentUser._id,
    }
  )
    .then((user) => res.redirect("/classifieds"))
    .catch((err) => next(err));
});

router.get("/doggos/:id/accepted", ensureIsLogged, (req, res, next) => {
  console.log("oi:", req.params.id);
  console.log("oi:", req.params.id);
  User.findByIdAndUpdate(
    { _id: req.session.currentUser._id },
    {
      friends: req.params.id,
    },
    { _id: req.params.id },
    {
      friends: req.session.currentUser._id,
    }
  )
    .then((user) => res.redirect("/classifieds"))
    .catch((err) => next(err));
>>>>>>> 6a8f478a1e4fb0432e094707844894c39df9c6b0
});

// router.get("/doggos/:id/dm", (req, res, next) => {
//   console.log("oi:", req.params.id);
//   console.log("oi:", req.params.id);
//   User.findByIdAndUpdate(
//     { _id: req.session.currentUser._id },
//     {
//       friends: req.params.id,
//     }
//   )
//     .then((user) => res.render("/classifieds", { user }))
//     .catch((err) => next(err));
// });



router.get("/doggos/:id", ensureIsLogged, (req, res, next) => {
  console.log("doggo is :", req.params.id);
  console.log("i am", req.session.currentUser);
  console.log(req.session.currentUser.requests.includes(req.params.id));
  console.log(req.session.currentUser.friends.includes(req.params.id));
  console.log("oiiiiiiiii", req.params.id === req.session.currentUser._id);

  User.findOne({ _id: req.params.id })
    .then((doggo) => {
      isBone = true;
      isAccepted = true;
      isNotSent = true;
      isUser = true;

      if (req.session.currentUser.friends.includes(req.params.id)) {
        res.render("doggo", { doggo, isAccepted });
      } else {
        if (req.session.currentUser.requests.includes(req.params.id)) {
          res.render("doggo", { doggo, isBone });
        } else {
          // res.render("doggo", { doggo, isNotSent });
          if (req.params.id === req.session.currentUser._id) {
            res.render("doggo", { doggo, isUser });
          } else {
            res.render("doggo", { doggo, isNotSent });
          }
        }
      }
    })
    .catch((error) => next(error));
});

module.exports = router;
