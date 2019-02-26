const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    //requester: the person who creates the request for a product
    requester: { type: Schema.Types.ObjectId, ref: "User", required: true },
    //bidders: those offering their products to the requester
    bidders: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
    //a description of the product, not including the requirements they have
    //Example description: I want an iPhone.
    //Example requirement: Must be iPhone7 or greater
    offers: { type: Number },
    description: { type: String, required: true },
    requirements: { type: Array, required: true },
    //complete is marked true when/if the requester has agreed to purchase an item
    complete: { type: Boolean },
    //creating a chatroom, which will have its own schema
    chatroom: [{ type: Schema.Types.ObjectId, ref: "ChatRoom" }]
});

Product.pre("save", function (next) {
    //setting the default value for completion
    this.complete = false;
    //createdAt and updatedAt, the alpha and omega
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model("Product", Product);