const express = require("express");
const app = express();
const {adminAuth} = require('./auth')

app.use('/admin', adminAuth);

app.get('/admin/getAllData', (req,res) => {
    res.send("Data collected")
})

app.get('/admin/deleteAllData', (req,res) => {
    res.send("Data deleted")
})

//case 1 "?" b is optional here
app.get("/ab?c", (req,res) => {
    res.send({firstName:"Tanvi", lastName:"Agarwal"})
})


//case 2 "+" b can come as many times
app.get("/ab+c", (req,res) => {
    res.send({firstName:"Tanvi", lastName:"Agarwal"})
})


//case 3 "*" can add anything between ab & cd
app.get("/ab*cd", (req,res) => {
    res.send({firstName:"Tanvi", lastName:"Agarwal"})
})

// result - Tanvi Agarwal in object and error that the headers are already set. We can play by exchanging positions of next and res
app.get("/user", (req,res,next) => {
    console.log(req.query)
    // res.send({firstName:"Tanvi", lastName:"Agarwal"})
    next();
},
(req,res,next) => {
    console.log(req.query)
    res.send({firstName:"Tanya", lastName:"Agarwal"})
    // next();
}
)

// It will only match for /user get api call not like app.use
// app.get("/user", (req,res) => {
//     console.log(req.query)
//     res.send({firstName:"Tanvi", lastName:"Agarwal"})
// })

app.get("/user/:id/:name", (req,res) => {
    console.log(req.params)
    res.send({firstName:"Tanvi", lastName:"Agarwal"})
})

app.post("/user", (req,res) => {
    res.send("Data saved successfully")
})

app.delete("/user", (req,res) => {
    res.send("Data deleted successfully")
})

// using "/" with app.use will handle all route matching with "/"
//  and whatever you add after "/" for route it will always redirect to the "/" route only.
// example /hello route will be same for /hello, /hello/xyz....
// by changing order we can manage correct functionality as it will execute line by line 
// and the first order if has /hello it will go with that rather than /

//Routes for testing

// app.use("/hello", (req,res) => {
//     res.send("Hello, How are you?")
// })

app.use("/test", (req,res) => {
    res.send("Heya!")
})

// app.use("/test", (req,res) => {
//     res.send("Hello, What's Up!")
// })


app.listen(3000, () =>{
    console.log("Hello Match!")
})