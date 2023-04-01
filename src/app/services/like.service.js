const { Like, User, Post, Notification } = require('../models/');
const mongoose = require('mongoose');

class LikeService {
    async likePost(req, res, next) {
        try {
            const postId = req.body.belongToPost;
            const likerId = req.body.owner;

            const post = await Post.findById(postId);

            if (!post) return res.status(404).send({ message: "Bài viết không tồn tại" });

            const like = new Like({
                belongToPost: postId,
                owner: likerId,
            });

            const noti = new Notification({
                text: "đã thích bài viết của bạn",
                postId: postId,
                fromUser: likerId,
                toUser: post.owner,
            })

            const newLike = await like.save();
            
            if (newLike) {
                const updatePost = await Post.findByIdAndUpdate(
                    like.belongToPost,
                    {
                        $push: {
                            likes: [newLike._id],
                        }
                    },
                );

                if(noti.fromUser.toString() != post.owner.toString()) {
                    const saveNoti = await noti.save();
                    const newNoti = await Notification.findById(saveNoti._id)
                    .populate('fromUser', '-userName -password')
                    .populate('toUser', '-userName -password')
                    return res.status(201).send({newLike, newNoti});
                }

                return res.status(201).send(newLike);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

    async deleteLikePost(req, res, next) {
        const postId = req.params.postId;
        const owner = req.params.userId;
        try {
            const like = await Like.findOne({
                belongToPost: postId,
                owner: owner,
            });

            if (!like) return res.status(404).send("Like không tồn tại");

            const result = await Like.findByIdAndDelete({ _id: like._id });

            if (result) {
                const updatePost = await Post.findByIdAndUpdate(
                    postId,
                    {
                        $pullAll: {
                            likes: [like._id],
                        }
                    }
                ).populate('owner').populate('likes');
                return res.status(200).send(result);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

    async getByPostId(req, res, next) {
        try {
            const postId = req.params.postId;
            const likes = await Like.find({
                belongToPost: postId,
            });
            return res.status(200).send(likes);
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}

module.exports = new LikeService;