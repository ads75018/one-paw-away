const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds);
const User = require("../models/User.model");

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const pets = req.body.pets
  const birthday = req.body.birthday
  const location = req.body.location
  const important = req.body.important
  const bio = req.body.bio


  const hashedPassword = bcryptjs.hashSync(password, salt);
  console.log(`Password hash: ${hashedPassword}`);

  User.create({
    username,
    passwordHash: hashedPassword,
    name,
    pets,
    birthday,
    location,
    important,
    bio

  })
    .then((userFromDB) => {
      console.log("Newly created user is: ", userFromDB);
      res.redirect("/classifieds");
    })
    .catch((error) => next(error));
});

// router.get("/profile", (re©q, res, next) => {
//   res.render("users/user-profile", { userInSession: req.session.currentUser });
// });



router.get("/login", (req, res, next) => {
  res.render("auth/login", {
    isLogin: true
  });
});

router.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log("SESSION =====> ", req.session);

  if (!username || !password) {
    res.render("auth/login", {
      errorMessage: "Please enter both, username and password to login.",
    });
    return;
  }
    console.log("username is:", username)
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        console.log("coucou", user)
        res.render("auth/login", {
          errorMessage: "Username is not registered. Try with other username.",
        });
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
        req.session.currentUser = user;
        res.redirect("/classifieds");
      } else {
        res.render("auth/login", { errorMessage: "Incorrect password." });
      }
    })
    .catch((error) => next(error));
});


router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/login'); // GET /login
  // res.send('oiiiii')
});

// router.post('/logout', (req, res) => {
//   req.session.destroy();
//   res.redirect('/login');
// });

module.exports = router;