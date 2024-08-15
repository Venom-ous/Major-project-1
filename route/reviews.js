const express = require("express");
const Router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const {reviewSchema} = require("../schema.js")
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");


const vlidateReview = (req, res, next) => {
    let{error} = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el).message).join(",")
        throw newExpresssError(400, errMsg);    
    }else{
        next();
    }
}

// Reviews of Posts route

router.post("/", validateReview, wrapAsync(async(req, res) => {
    let listing = await listng.findById(req.params.id);
    let newReview = new Review(req.body.review);
    
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("new review saved");
    res.send("new review saved");
    
    res.redirect(`/listings/${listing._id}`);
}))

// Delete review route

router.delete("/:reviewId", wrapAsync(async(req, res) =>{
    let{id, reviewId} = req.params;

    await Lisitng.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listing/${id}`)
}))

module.exports = Router;