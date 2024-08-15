const express = require("express");
const Router = express.Router();
const User = require("../models/user.js");

Router.get("/signup", (req, res) =>{
    res.render("users/signup.ejs")
});


Router.post("/signup", async(req, res) => {
    let {username, Email, password} = req.body;
    const newUser = new User({Email, username});
    const registeredUser = await User.register(newUser, "system123#");
    req.flash("success", "welcome to mock test");
    console.log(newUser);
    res.redirect("/home")
})

Router.get("/login", (req, res) => {
    res.render("users/login.ejs")
})

Router.post("/login",
    passport.authenticate("local", { failureflash: true, failureRedirect: "/login" }), 
    async (req, res) => {
        res.send("Logged-in succcessfully");
})
module.exports = Router;