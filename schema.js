const joi = require("joi");

module.exports.listingSchema = joi.object({
    lisitng: joi.object({
        title: joi.string().requried(),
        description: joi.String().requires(),
        location: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().requried().min(0),
        image: joi.string().allow("", null),
    }).required(),
});

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(10),
        comment: joi.string().required(),

    }).required(),
})