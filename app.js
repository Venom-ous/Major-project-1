const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Listing = require("./models/listing.js");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected");
}).catch((err) => {
    console.log(err)
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}


app.get("/", (req, res) => {
    res.send("I'm root")
})

// Create route

app.get("/listings", async (req, res) =>{
    const allListings = await Listing.find({});

                            //  index.ejs ko sara data mil jayega allListings ke form m

    res.render("listings/index.ejs", {allListings});    
})

// New route

                            // phle data get kro new wale page se 

app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs")
})

                            // ab us data ko post krdo listing page m

app.post("/listings", async (req, res) => {
                            //ek method h to get params from body

    // let { title, description, price, location, image, country} = req.body;
    // let listing = req.body.listing;

                            // more convinient way
    
    const newListing = new Listing(req.body.listing);
    await newListing.save();

    res.redirect("/listings")
})


// Show Route

app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing})
})

//Edit Route

app.get("/listings/:id/edit", async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
})

//update route

app.put("/listings/:id", async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

//DELETE route

app.delete("/listings/:id", async (req, res) => {
    let {id} = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    res.redirect("/listings");
})


// app.get("/testListing", async (req, res) => {
//     let samplelisting = new Listing({
//         title: "My new villa",
//         description: "By the beach",
//         peice: 1200,
//         location: "lonawala",
//         country: "India",
//     });

//     await samplelisting.save();
//     console.log("doc is saved successfully");
//     res.send("successful testing");
// });

app.listen(8080, () =>{
    console.log(`server is listening to 8080}`);
})