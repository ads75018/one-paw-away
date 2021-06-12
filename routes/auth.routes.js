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
  const pets = req.body.pets;
  const birthday = req.body.birthday;
  const location = req.body.location;
  const important = req.body.important;
  const bio = req.body.bio;

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
    bio,
  })
    .then((userFromDB) => {
      console.log("Newly created user is: ", userFromDB);
      res.redirect("/classifieds");
    })
    .catch((error) => next(error));
});

router.get("/login", (req, res, next) => {
  if (req.session.currentUser === undefined) {
    res.render("auth/login", {
      isLogin: true,
    });
  } else {
    res.redirect("/classifieds");
  }
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
  console.log("username is:", username);
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        console.log("coucou", user);
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

router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/login");
});

<<<<<<< HEAD
<<<<<<< HEAD
function ensureIsLogged(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
}
router.get("/secret", ensureIsLogged, (req, res, next) => {
  res.render("secret");
});
=======
// router.post('/logout', (req, res) => {
//   req.session.destroy();
//   res.redirect('/login');
// });
>>>>>>> 6a8f478a1e4fb0432e094707844894c39df9c6b0

module.exports = router;
=======
module.exports = router;
>>>>>>> 94d502bd64727e71a0ef086c97ec35a05796c9ae
