const express = require('express');
const { userAuth } = require('../middleware/auth');
const connectionRequest = require('../models/connectionRequestSchema')
const User  = require('../models/userSchema')

const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/request/received", userAuth, async(req, res) =>{
    try{
        const loggedInUser = req.user
        const connectionRequests = await connectionRequest.find({
            toUserId: loggedInUser._id,
            status:"interested"
        }).populate("fromUserId", ["firstName", "lastName"])

        res.json({message:"Data fetched successfully", data:connectionRequests})
    }catch(err){
        res.statusCode(400).send("Error : " + err.message)
    }
})

userRouter.get("/user/connections", userAuth,  async(req,res) => {
    try{
        const loggedInUser = req.user;
        const connectionRequests = await connectionRequest.find({
            $or:[
                {
                status:"accepted", toUserId:loggedInUser._id
            },
            {
                status:"accepted", fromUserId:loggedInUser._id
            }
        ]
        })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA)
        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
              return row.toUserId;
            }
            return row.fromUserId;
          });
      
          res.json({ data });
    } catch(err){
        res.statusCode(400).send("Error: " + err.message)
    }
})

userRouter.get("/feed", userAuth, async(req,res) => {
    try{
        const loggedInUser = req.user
        const page = parseInt(req.query.page) || 1
        let limit = parseInt(req.query.limit) || 10
        limit = limit > 50 ? 50 : limit
        const skip = (page-1)*limit
        const connections = await connectionRequest.find({
            $or:[{
                fromUserId:loggedInUser._id
            },
        {
            toUserId:loggedInUser._id
        }]
        }).select("fromUserId toUserId")
        // .populate("fromUserId", "firstName").populate("toUserId", "firstName")

        const hideUserFromFeed = new Set();
        connections.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());

        })
        const users = await User.find({
            $and: [
                {_id: { $nin: Array.from(hideUserFromFeed) } },
                {_id: {$ne: loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)
        res.send(users)
    } catch(err){
        res.status(400).send(err.message)
    }
})
module.exports = userRouter;