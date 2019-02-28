const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatroomSchema = new Schema({
    channel: { type: String, required: true },
    requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bidderId: { type: Schema.Types.ObjectId, required: true },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message', required: false }],
    productId: { type: Schema.Types.ObjectId, ref: 'Product' }
}, { timestamps: true });


module.exports = mongoose.model('Chatroom', ChatroomSchema);
