const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    memberSince: { type: Date, default: Date.now() },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, select: false },
    rating: { type: Number },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    chatrooms: [{ type: Schema.Types.ObjectId, ref: 'Chatroom' }],
    productsForSale: [{ type: Schema.Types.ObjectId, ref: 'productsForSale' }]
}, { timestamps: true });

UserSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (error, hash) => {
            this.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (password, done) {
    bcrypt.compare(password, this.password, done);
}

module.exports = mongoose.model('User', UserSchema);
