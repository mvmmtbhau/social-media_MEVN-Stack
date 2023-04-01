const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const Schema = mongoose.Schema;

const LikeCommentSchema = new Schema({
    belongToComment: {
        type: mongoose.Types.ObjectId, 
        ref: 'Comment',  
      },
    owner: {
        type: mongoose.Types.ObjectId, 
        ref: 'User',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('LikeComment', LikeCommentSchema);