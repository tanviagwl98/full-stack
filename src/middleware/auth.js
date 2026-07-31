const jwt = require("jsonwebtoken");
const User = require('../models/userSchema');

const userAuth= async(req,res,next)=>{
try{
    const {token} = req.cookies;
    if(!token){
        res.status(401).send("Please login")
    }
    const decodedObj = await jwt.verify(token, "DEVTinder$70");

    const {_id} = decodedObj;
    const user = await User.findById(_id)
    if(!user){
        res.status(401).send("Please login")
    }

    req.user = user
    next();
}catch(err){
    res.status(400).send("err :" + err.message)
}    

}

module.exports = {
    userAuth
}