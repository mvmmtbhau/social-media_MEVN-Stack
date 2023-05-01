const { Comment, Post, Notification, Report } = require('../models/');
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
        try {
            const postId = req.params.postId;
            const userId = req.params.userId;

            const reports = await Report.find({
                fromUser: userId,
                comment: {
                    $ne: null,
                }
            })

            const commentIdArr = [];

            reports.forEach(report => {
                commentIdArr.push(report.comment);
            });

            const comments = await Comment.find({
                belongToPost: postId,
                _id: {
                    $nin: commentIdArr,
                }
            }).populate('owner').populate('likes');

            return res.status(200).json(comments);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async deleteById(req, res, next) {
        try {
            const commentDeleted = await Comment.findByIdAndDelete(req.params.id);
            
            if(!commentDeleted) return res.status(404).json('Không tìm thấy comment');

            return res.status(200).json('Xóa thành công');
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = new CommentService;  