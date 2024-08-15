const mongoose = require("mongoose");
const reviews = require("./reviews");
const Schema = mongoose.Schema;
const Review = requrie("./reviews.js")


const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default:"https://unsplash.com/photos/a-close-up-of-yellow-flowers-on-a-yellow-background-l4X_CU27qSQ",
        set: (v) => v ===" "?"https://unsplash.com/photos/a-close-up-of-yellow-flowers-on-a-yellow-background-l4X_CU27qSQ" : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
        type: Schema.Types.ObjectId,
        ref: "Reviews",
    },]
})

listingSchema.post("findOneAndDelete", async(lising) =>{
   if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});
   }
})

// schema ka model bnaya h Listing naam ka

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;