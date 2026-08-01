const express = require("express");

require("dotenv").config();
require("./utils/cron")
const dbConnect = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors")

const http = require("http")


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
const paymentRouter = require("./routes/payment");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat")
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

app.use('/', paymentRouter);

app.use('/', chatRouter)


const server = http.createServer(app)
initializeSocket(server)
dbConnect()
  .then(() => {
    console.log("database connected successully");
    server.listen("7777", (req, res) => {
      console.log("Hello");
    });
  })
  .catch((err) => {
    console.log("Error Occured");
  });
