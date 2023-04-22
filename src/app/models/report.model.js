const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    fromUser: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    optionReport: {
        type: mongoose.Types.ObjectId,
        ref: 'OptionReport',
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
    },
    commentId: {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
    },
    status: Number,
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Report', ReportSchema);