const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const Schema = mongoose.Schema;

const OptionReportSchema = new Schema({
    text: String,
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('OptionReport', OptionReportSchema);