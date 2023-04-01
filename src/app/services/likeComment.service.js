const { LikeComment, Comment, Notification } = require('../models/');
const mongoose = require('mongoose');

class LikeCommentService {
    async likeComment(req, res, next) {
        try {
            const commentId = req.body.belongToComment;
            const userId = req.body.owner;
            
            const comment = await Comment.findById(commentId);
            
            if(!comment) return res.status(404).send("Comment not found");

            const likeComment = new LikeComment({
                belongToComment: commentId,
                owner: userId
            });

            const noti = new Notification({
                text: 'đã thích bình luận của bạn',
                fromUser: userId,
                toUser: comment.owner,
                postId: comment.belongToPost,
            })

            const newLikeComment = await likeComment.save();
            if (newLikeComment) {
                const updateComment = await Comment.findByIdAndUpdate(
                    likeComment.belongToComment,
                    {
                        $push: {
                            likes: newLikeComment._id,
                        }
                    }
                );

                if(noti.fromUser.toString() != comment.owner.toString()) {
                    const saveNoti = await noti.save();
                    const newNoti = await Notification.findById(saveNoti._id)
                    .populate('fromUser', '-userName -password')
                    .populate('toUser', '-userName -password')
                    return res.status(201).send({newLikeComment, newNoti});
                }

                return res.status(201).send(newLikeComment);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

    async deleteLikeComment(req, res, next) {
        try {
            const likeComment = await LikeComment.findOne({
                belongToPost: req.params.commentId,
                owner: req.params.userId
            });

            if(!likeComment) return res.status(404).send("Like comment not found");
            
            const result = await LikeComment.findByIdAndDelete(likeComment.id);

            if (result) {
                const updateComment = await Comment.findByIdAndUpdate(
                    result.belongToComment,
                    {
                        $pullAll: {
                            likes: [result._id],
                        }
                    }
                );
                return res.status(200).send(result);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}

module.exports = new LikeCommentService;