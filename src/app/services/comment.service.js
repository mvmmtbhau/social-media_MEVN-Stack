const { Comment, Post, Notification } = require('../models/');
const mongoose = require('mongoose');

class CommentService {
    async createComment(req, res) {
        try {
            const text = req.body.text;
            const postId = req.body.belongToPost;
            const userId = req.body.owner;

            const post = await Post.findById(postId);

            if (!post) return res.status(404).send("Post not found");

            const comment = new Comment({
                text: text,
                belongToPost: postId,
                owner: userId,
            });

            const noti = new Notification({
                text: "đã bình luận bài viết của bạn",
                fromUser: userId,
                toUser: post.owner,
                postId: postId,
            })

            const saveComment = await comment.save();
            if (saveComment) {
                const newComment = await Comment.findById(saveComment._id).populate('owner', '-userName -password');

                if (noti.fromUser.toString() != post.owner.toString()) {
                    const saveNoti = await noti.save();
                    const newNoti = await Notification.findById(saveNoti._id)
                        .populate('fromUser', '-userName -password')
                        .populate('toUser', '-userName -password')
                    return res.status(201).send({ newComment, newNoti });
                }

                return res.status(201).send(newComment);
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getCommentsByPostId(req, res) {
        const postId = req.params.postId;
        try {
            const result = await Comment.find({ belongToPost: postId }).populate('owner').populate('likes');
            return res.status(200).send(result);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = new CommentService;  