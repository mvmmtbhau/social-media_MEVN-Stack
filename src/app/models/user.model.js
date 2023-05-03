const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullName: String,
    userName: String,
    password: String,
    bio: {
        type: String,
    },
    email: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        default: '',
    },
    gender: {
        type: Number,
    },
    avatar: '',
    private: {
        type: Boolean,
        default: false,
    },
    role: {
      type: String,
      default: 'user',  
    },
    posts: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Post',
        }
    ],
    savedPosts: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Post',
        }
    ],
    follows: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Follow',
        }
    ],
    hasFollowers: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Follow',
        }
    ],
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);