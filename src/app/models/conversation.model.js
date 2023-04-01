const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    hasMessages: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Message',
        }
    ],
    userOne: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    userTwo: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Conversation', ConversationSchema);