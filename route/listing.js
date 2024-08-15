const express = require("express");
const Router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const {listingSchema} = require("../schema.js")

const vlidateListing = (req, res, next) => {
    let{error} = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el).message).join(",")
        throw newExpresssError(400, errMsg);    
    }else{
        next();
    }
}

// Create route

Router.get("/", wrapAsync(async(req, res) =>{
    const allListings = await Listing.find({});

//  index.ejs ko sara data mil jayega allListings ke form m

    res.render("/index.ejs", {allListings});    
}))

// New route

// phle data get kro new wale page se 

Router.get("/new", (req, res) => {
    res.render("listings/new.ejs")
})

// ab us data ko post krdo listing page m

Router.post("/",validateListing, wrapAsync(async (req, res) => {
//ek method h to get params from body

// let { title, description, price, location, image, country} = req.body;
// let listing = req.body.listing;

// more convinient way

    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "new Listing created");

    res.redirect("/listings")
}));


// Show Route

Router.get("/:id", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error", "listing you requested doesn't exists");
        res.redirect("/listings")
    }
    res.render("listings/show.ejs", {listing})
})

//Edit Route

Router.get("/:id/edit", async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "listing you requested doesn't exists");
        res.redirect("/listings")
    }
    res.render("listings/edit.ejs", {listing});
})

//update route

Router.put("/:id", async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

//DELETE route

Router.delete("/:id", async (req, res) => {
    let {id} = req.params;
    var result = prompt("Are you sure to delete?");
    if(result){
        let deletedList = await Listing.findByIdAndDelete(id);
        console.log(deletedList);
        req.flash("success", "Listing deleted")
        res.redirect("/listings");

    }
    else{
        res.redirect("/listings/:id");
    }
  
})

module.exports = Router;
