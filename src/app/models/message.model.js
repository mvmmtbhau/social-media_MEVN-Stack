const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: String,
    read: {
        type: Boolean,
        default: false
    },
    belongConversation: {
        type: mongoose.Types.ObjectId,
        ref: 'Conversation',
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Message', MessageSchema);