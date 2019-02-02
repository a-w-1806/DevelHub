const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../../Models/Profile");

router.get("/test", (req, res) =>
  res.json({
    msg: "Profile works"
  })
);

//  @route  GET api/profile
//  @desc   Get the current users profile
//  @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user.";
          return res.status(404).json(errors);
        }
        return res.json(profile);
      })
      .catch(err => {
        console.log(err);
        res.status(404).json(err);
      });
  }
);

module.exports = router;
