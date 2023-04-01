const mongoose = require('mongoose');
const userModel = require('./user.model');

mongoose.set('strictQuery', true);

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    value: String,
    owner: {
        type: mongoose.Types.ObjectId, 
        ref: userModel,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Profile', profileSchema);