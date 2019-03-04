const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String, required: true },
    //requester: the person who creates the request for a product
    requester: { type: Schema.Types.ObjectId, ref: "User", required: true },
    //bidders: those offering their products to the requester
    bidders: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    //a description of the product, not including the requirements they have
    //Example description: I want an iPhone.
    //Example requirement: Must be iPhone7 or greater
    offers: { type: Number, default: 0 },
    description: { type: String, required: false },
    requirements: { type: String, required: false },
    category: { type: String, default: "General"},
    //complete is marked true when/if the requester has agreed to purchase an item
    image: { type: String, required: true },
    complete: { type: Boolean, default: false },
}, { timestamps: true });

// Product.pre("save", function (next) {
//     //setting the default value for completion
//     this.complete = false;
//     //createdAt and updatedAt, the alpha and omega
//     const now = new Date();
//     this.updatedAt = now;
//     if (!this.createdAt) {
//         this.createdAt = now;
//     }
//     next();
// });



module.exports = mongoose.model("Product", Product);
