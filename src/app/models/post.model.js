const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const Comment = require('./comment.model');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    content: {
        type: String,
        default: ''
    },
    images: [],
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Like',
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

PostSchema.pre('remove', async (next) => {
    try {
        await Comment.remove({
            _id: {
                $in: this.comments,
            }
        });
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Post', PostSchema);