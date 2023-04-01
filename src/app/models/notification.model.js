const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    text: String,
    read: {
        type: Number,
        default: 0,
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
    },
    fromUser: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    toUser: {
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

module.exports = mongoose.model('Notification', NotificationSchema);