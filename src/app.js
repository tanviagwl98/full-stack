const express = require("express");

require("dotenv").config();

const dbConnect = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const app = express();


app.use(cors({
  origin:"http://localhost:5173",
  // origin:"http://3.25.119.234",
  credentials:true
}))
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestsRouter = require('./routes/requests');
const userRouter = require("./routes/user");
// app.get("/user", async (req, res) => {
//   let email = req.body.email;
//   try {
//     const userName = await User.find({ email: email });
//     res.send(userName);
//   } catch (err) {
//     console.log("Something went wrong");
//   }
// });

// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (err) {
//     console.log("Something went wrong");
//   }
// });

// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;

//   await User.findByIdAndDelete(userId);
//   res.send("User Deleted");
// });

// app.patch("/user/:userId", async (req, res) => {
//   const data = req.body;
//   const userId = req.params?.userId;
//   try {
//     const updatesAllowed = ["gender", "age", "desc", "skills"];
//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       updatesAllowed.includes(k)
//     );

//     if (!isUpdateAllowed) {
//       throw new Error("Updates not allowed");
//     }
//     const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     console.log(user);
//     res.send("User updated successfully");
//   } catch (err) {
//     res.status(500).send("Error" + err);
//   }
// });

app.use('/', authRouter)

app.use('/', profileRouter)

app.use('/', requestsRouter)

app.use('/', userRouter);

dbConnect()
  .then(() => {
    console.log("database connected successully");
    app.listen("7777", (req, res) => {
      console.log("Hello");
    });
  })
  .catch((err) => {
    console.log("Error Occured");
  });
