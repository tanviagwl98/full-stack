const express = require("express");
const User = require("../models/userSchema");
const authRouter = express.Router();
const { validateSignUp } = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  // const userObj = {
  //     firstName:"Tanvi",
  //     lastName:"Agarwal",
  //     email:"vini98agwl@gmail.com",
  //     password:"gajwdkhkw",
  //     age:26,
  //     gender:"F"
  // }
  try {
    validateSignUp(req);
    const { firstName, lastName, password, email } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    const savedUser = await user.save();
    
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.json({ message: "User Added successfully!", data: savedUser });
    } catch (err) {
    res.status(400).send("Error saving the user" + err);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user)
    if (!user) {
      throw new Error("Invalid Cred");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token,{
        expires: new Date(Date.now() + 8 * 3600000),
      });
      console.log(token)
      res.send(user);
    } else {
      throw new Error("Invalid Cred");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null,{expires: new Date(Date.now())})
    res.send("Logout Successsfully!")
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = authRouter;
