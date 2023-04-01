const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    belongToPost: {
      type: mongoose.Types.ObjectId, 
      ref: 'Post',  
    },
    owner: {
        type: mongoose.Types.ObjectId, 
        ref: 'User',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Like', LikeSchema);