const mongoose = require('mongoose');

async function connectDatabase(uri) {
    try {
        await mongoose.connect(uri);
    } catch (err) {
        console.log(err);
    };
};

module.exports = connectDatabase;