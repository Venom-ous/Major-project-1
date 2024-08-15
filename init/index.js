const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then(() => {
    console.log("connected");
}).catch((err) => {
    console.log(err)
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async () =>{
    //Faltu ki entry delete kih jo phle se present thi
        
        await Listing.deleteMany({});
    // Lisitng naam ke model m data dala h
    
        await Listing.insertMany(initData.data);
        console.log("data was initialized");
};

initDB();