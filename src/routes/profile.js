const express = require('express');
const bcrypt = require('bcrypt');
const { userAuth } = require('../middleware/auth');
const { validateProfileEditData, validatePasswordUpdate } = require("../utils/validation")
const profileRouter = express.Router()

profileRouter.get("/profile/view", userAuth, async(req, res) => {
    try{
        res.send(req.user);
      
    } catch(err){
        res.status(400).json({ message: err.message });
    }
});

profileRouter.patch("/profile/edit", userAuth, async(req, res) => {
    try{
        if(!validateProfileEditData(req)){
            throw new Error("Invalid Edit Request")
        };

        const loggedInUser = req.user
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();
    
        res.json({
          message: `${loggedInUser.firstName}, your profile updated successfuly`,
          data: loggedInUser,
        });
      
    } catch(err){
        res.status(400).json({ message: err.message });
    }
});

profileRouter.patch("/profile/updatePassword", userAuth, async(req, res) => {
    try{
        validatePasswordUpdate(req);

        const { currentPassword, newPassword } = req.body;
        const loggedInUser = req.user;

        const isPasswordValid = await bcrypt.compare(currentPassword, loggedInUser.password);
        if (!isPasswordValid) {
            throw new Error("Current password is incorrect");
        }

        loggedInUser.password = await bcrypt.hash(newPassword, 10);
        await loggedInUser.save();

        res.json({ message: "Password updated successfully" });
      
    } catch(err){
        res.status(400).json({ message: err.message });
    }
});

module.exports = profileRouter