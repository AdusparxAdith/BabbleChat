const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    let userExists = await User.findOne({ email });
    if (userExists) return res.send({ message: "This user already exists!" });
    else {
      let created_on = new Date().toISOString();
      let user = await User.collection.insertOne({
        email,
        name,
        password,
        created_on
      });

      return res.send({ message: "Welcome to the best Chat Application!" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
