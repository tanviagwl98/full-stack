const express = require('express');
const { userAuth } = require('../middleware/auth');
const {validateProfileEditData} = require("../utils/validation")
const profileRouter = express.Router()

profileRouter.get("/profile/view", userAuth, async(req, res) => {
    try{
        res.send(req.user);
      
    } catch(err){
        res.status(401).send(err).message    
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
        res.status(401).send(err).message    
    }
});

module.exports = profileRouter