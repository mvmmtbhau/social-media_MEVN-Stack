const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const Schema = mongoose.Schema;

const FollowSchema = new Schema({
    state: {
        type: Boolean,
        default: true,
    },
    fromUser: {
        type: mongoose.Types.ObjectId, 
        ref: 'User',
    },
    followUser: {
        type: mongoose.Types.ObjectId, 
        ref: 'User',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Follow', FollowSchema);