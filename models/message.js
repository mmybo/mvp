const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatroomSchema = new Schema({
    channel: { type: String, required: true },
    requester: { type: Schema.Types.ObjectId, required: true },
    provider: { type: Schema.Types.ObjectId, required: true},
    messages: {type: [Schema.Types.ObjectId]},
    productReqCard: {type: Schema.Types.ObjectId}
}, { timestamps: true });


module.exports = mongoose.model('Chatroom', ChatroomSchema);
