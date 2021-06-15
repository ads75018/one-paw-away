const express = require("express");
const router = express.Router();
const moment = require("moment");

const User = require("../models/User.model");
const Message = require("../models/Message.model");
const { isValidObjectId } = require("mongoose");

function ensureIsLogged(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
}

router.get("/", (req, res, next) => {
  res.redirect("/login");
});

router.get("/about", (req, res, next) => res.render("about.hbs"));

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

router.get("/classifieds", ensureIsLogged, (req, res, next) => {
  User.find({})
    .then((allTheDoggosFromDB) => {
      for (let i = 0; i < allTheDoggosFromDB.length; i++) {
        const doggo = allTheDoggosFromDB[i];
        doggo.age = moment(allTheDoggosFromDB[i].birthday).format("LL");
        console.log(doggo.age);
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

router.get("/messages", ensureIsLogged, (req, res, next) => {
  console.log(req.session.currentUser);

  User.findById(req.session.currentUser._id)
    .populate("requests")
    .populate("friends")
    .then((user) => {
      res.render("messages", { user });
    })
    .catch((error) => next(error));
});

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
  console.log("oii array:", req.params.id);

  User.findById(req.session.currentUser.id)
    .then(function (user) {
      req.session.currentUser.friends.push(req.params.id);
      // req.params.id.friends.push(req.session.currentUser.id)
      req.session.currentUser.requests.filter(
        (request) => request === req.params.id
      );
      User.findByIdAndUpdate(
        { _id: req.params.id },
        {
          friends: req.session.currentUser._id,
        }
      ).then((user) => {});
      res.redirect("/classifieds");
    })
    .catch((err) => next(err));
});

router.get("/doggos/:id/dms", ensureIsLogged, (req, res, next) => {
  const sender = req.params.id;
  const receiver = req.session.currentUser._id;
  User.findById(req.session.currentUser._id)
    .then((user) => {
      User.findById(req.params.id).then((sender) => {
        console.log("ici=>", user, "oi", sender);
        console.log("sender id", req.params.id);
        console.log("receiver id", req.session.currentUser._id);
        Message.find({
          sender: req.params.id,
          receiver: req.session.currentUser._id,
        }).then((messageReceived) => {
          Message.find({
            receiver: req.params.id,
            sender: req.session.currentUser._id,
          }).then((messageSent) => {
            console.log("sender id", req.params.id);
            console.log("receiver id", req.session.currentUser._id);
            console.log(messageReceived);
            res.render("dm.hbs", {
              user,
              sender,
              messageReceived,
              messageSent,
            });
          });
        });
      });
    })
    .catch((error) => {
      console.log("Error while getting the Doggos from DB:", error);
      next(error);
    });
});

router.post("/doggos/:id/dms", ensureIsLogged, (req, res, next) => {
  console.log(
    "check this =>>>>>",
    req.body,
    req.session.currentUser._id,
    req.body
  );
  Message.deleteOne({
    sender: req.session.currentUser._id,
    receiver: req.params.id,
  })
    .then((user) => {
      Message.create({
        sender: req.session.currentUser._id,
        receiver: req.params.id,
        message: req.body.message,
      });
    })

    .then((user) => res.redirect("/classifieds"))
    .catch((err) => next(err));
});

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
      doggo.age = moment(doggo.birthday).format("LL")

      if (req.session.currentUser.friends.includes(req.params.id)) {
        res.render("doggo", { doggo, isAccepted });
      } else {
        if (req.session.currentUser.requests.includes(req.params.id)) {
          res.render("doggo", { doggo, isBone });
        } else {
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
