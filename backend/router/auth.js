const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// 1
require("../db/conn");


const User = require("../model/userSchema");
const Authenticate = require("../middleware/authenticate");

router.get("/", (req, res) => {
  res.send("hello world  from the server router js");
});

// // using promises
// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cPassword } = req.body;

//   // those three lines are for checking if postman is working properly or not??
//   console.log("name is : " + name);
//   console.log("email is : " + email);
//   // res.json({ message: req.body });

//   if (!name || !email || !phone || !work || !password || !cPassword) {
//     // status(422)  this will give u error type
//     return res.status(422).json({ error: "pls fill the registration form" });
//   }

//   // note:- the below code gives u error cause its calling body twice , idk exactly yyy
//   // res.json({ message: req.body });

//   User.findOne({ email: email })
//     .then((userExist) => {
//       // if user exist then return error422
//       if (userExist)
//         return res.status(422).json({ error: "email already registered" });

//       const user = new User({ name, email, phone, work, password, cPassword });

//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "user request successfully" });
//         })
//         .catch((err) => {
//           res.status(500).json({ error: "failed to registered " });
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// using await async
router.post("/register", async (req, res) => {

  try {

  // this is request from postman or data stored using postman or the frontend
  const { name, email, phone, work, password, cPassword } = await req.body;

  // those three lines are for checking if postman is working properly or not??
  console.log("name is : " + name);
  console.log("email is : " + email);
  // res.json({ message: req.body });

  if (!name || !email || !phone || !work || !password || !cPassword) {
    // status(422)  this will give u error type
    return res.status(422).json({ error: "Please fill the registration form" });
  }
  else {

    // note:- the below code gives u error cause its calling body twice , idk exactly yyy ,cause u cant call two res 
    // res.json({ message: req.body });

 
    const userExist = await User.findOne({ email: email });
    console.log(userExist);

    if (userExist)
      return res.status(422).json({ error: "email already registered" });
    else if (password != cPassword)
      return res.status(422).json({ error: "password are not matching " });
    else {
      const user = new User({ name, email, phone, work, password, cPassword });

      // password hashing
      await user.save();
    }

    res
      .status(201)
      .json({ message: "user registered successfully in backend" });



  }

  } catch (err) {
    console.log(err);
  }
});

// login route
router.post("/signin", async (req, res) => {
  // console.log(req.body);
  // res.json({message:"awesome"});

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "null data, please fill the data" });
    }

    // for getting the email data from database
    // first email is backend and second is from frontend
    // it will search for u the email u mentioned

    // and it will store the whole register data in userLogin
    const userLogin = await User.findOne({ email: email });
    console.log("userLogin data")
    console.log(userLogin);

    // this /if' is to check login credentials...
    if (userLogin) {

      // bcrypt.compare will return boolean
      // userLogin.password from whole registered data 

      // for example this ....

      // {
      //   _id: new ObjectId('65bb88cf1370b1194aa057da'),
      //   name: 'aniket panchal',
      //   email: 'mikasa7@gmail.com',
      //   phone: 1234567889,
      //   work: 'mern-dev',
      //   password: '$2a$12$tL0yF2qs3Dp8zMD.tZHqCe/PH8Ugx4UVZoY1fuuA.phT/2veurzie',
      //   cPassword: '$2a$12$eUELCJNgnDP22b57fIPqL.Sk9EzGhlr1f/vB/1KnrKJjV9rT0.hbq'

      const isMatch = await bcrypt.compare(password, userLogin.password);

    

      // this 'if statement' is for checking passwd credentials...
      if (!isMatch) {
        // res.json({ error: "user error" });
        res.status(400).json({ error: "invalid credentials pass " });
      } else {

          // jsonwebtoken
      const token = await userLogin.generateAuthToken();
      console.log("singIn TOKEN is...");
      console.log(token); 

      // storing to cookie
      // cookie
      res.cookie("jwtTokenBablu", token , {
        expires: new Date(Date.now() + 2589000000),
        httpOnly: true
      });

        res.json({ 
          message: "user Signing Successfully",
          token:token,
          user:userLogin,
      
      });
      }


    } else {
      res.status(400).json({ error: "invalid credentials user " });
    }

  } catch (err) {
    console.log(err);
  }
});



// about page
router.get("/about", Authenticate ,(req, res) => {
  res.send("hello ' about '  from the server");
});


module.exports = router;
