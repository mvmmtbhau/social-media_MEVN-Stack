const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const Schema = mongoose.Schema;

const FollowSchema = new Schema({
    owner: {
        type: mongoose.Types.ObjectId, 
        ref: 'User',
    },
    userFollowed: {
        type: mongoose.Types.ObjectId, 
        ref: 'User',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Follow', FollowSchema);