const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!email || !password || !name)
      return res.status(400).send({ message: "Please enter all details!" });

    let userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).send({ message: "This user already exists!" });
    else {
      let created_on = new Date().toISOString();

      password = await bcrypt.hash(password, 10);

      let user = await User.collection.insertOne({
        email,
        name,
        password,
        created_on
      });

      return res
        .status(200)
        .send({ message: "Welcome to the best Chat Application!" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send({ message: "Please enter all details!" });

    let user = await User.findOne({ email });

    if (user) {
      let authorized = await bcrypt.compare(password, user.password);

      if (authorized)
        res.status(200).send({ message: `Welcome back ${user.name}` });
      else res.status(401).send({ message: "Invalid Credentials!" });
    } else {
      res.status(400).send({ message: "User does not exist!" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
