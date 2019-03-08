const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
    sender: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, ref: 'Chatroom', required: true},
}, {timestamps: true });


module.exports = mongoose.model('Message', ChatroomSchema);
