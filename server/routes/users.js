const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//get back all the places
router.get("/get", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

//update profile photo
// router.patch("/patch/:userId", async (req, res) => {
//   try {
//     const updatedUser = await User.updateOne(
//       { _id: req.params.userId },
//       { $set: { profilePhoto: req.body.profilePhoto } }
//     );
//     const user = await User.findOne({ _id: req.params.userId });
//     res.json(user);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

router.patch("/patch/:userId", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          profilePhoto: req.body.profilePhoto,
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        },
      }
    );
    const user = await User.findOne({ _id: req.params.userId });
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
