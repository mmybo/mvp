const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// NOTE: For V1, I'm just going to alert users who make product requests that match the title and categorty of items that are on the "for sale item" list.
// But for later versions, I want to be able to alert based on matching descriptions and requirements
const forSaleProduct = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    requirements: [{type: String, required: false}],
    category: {type: String, required: false},
    image: { type: String, required: true },
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true})

// TODO: Research mongoose post method and ref in mongoose model. Make a list of BEW concepts that I've learn and Ikey implemented and come with questions on Monday to ask about

module.exports = mongoose.model('forSaleProduct', forSaleProduct);
