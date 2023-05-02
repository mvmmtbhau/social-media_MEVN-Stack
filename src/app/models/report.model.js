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
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
    },
    comment: {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
    },
    status: {
        type: Number,
        default: 0,
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Report', ReportSchema);