const mongoose = require('mongoose');
mongoose.set('strictQuery', true);



const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: String,
    belongToPost: 
        {
            type: mongoose.Types.ObjectId,
            ref: 'Post',
        },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'LikeComment',
        }
    ],
    owner: {
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



module.exports = mongoose.model('Comment', CommentSchema);