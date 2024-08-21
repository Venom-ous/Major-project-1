const lisitng = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js")
const {listingSchema} = require("./schema.js");
const {reviewSchema} = require("./schema.js")
const {validateReview}  = require("../middleware.js")



module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
            req.session.redirectUrl = req.originalUrl;
            req.flash("you must be logged to create listing");
            return res.redirect("/login")
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        req.locals.redirectUrl = req.session.redirectUrl
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
    let lising = await Listing.findById(id);
    if(!listing.owner._id.isequals(currUser._id)){
        req.flash("error", "you are not permitted to perform this operatio");
        return res.redirect("/listings");
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    let{error} = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el).message).join(",")
        throw newExpresssError(400, errMsg);    
    }else{
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    let{error} = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el).message).join(",")
        throw newExpresssError(400, errMsg);    
    }else{
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    let {reviewId} = req.params;
    let lising = await review.findById(id);
    if(!review.author._id.isequals(currUser._id)){
        req.flash("error", "you are not permitted to perform this operatio");
        return res.redirect("/listings");
    }
    next();
}