const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
    sender: {type: String, ref: 'sender', required: true},
    content: { type: String, ref: 'content', required: true},
}, {timestamps: true });


module.exports = mongoose.model('Message', Message);
