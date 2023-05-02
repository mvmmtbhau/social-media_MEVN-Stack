const { Post, User, Comment, Report } = require('../models/');
const mongoose = require('mongoose');

class MessageService {
    async create(req, res, next) {
        try {
            const post = new Post({
                content: req.body.content,
                owner: req.body.owner,
                images: req.files
            });

            const savePost = await post.save();
            if (savePost) {
                const updateUser = await User.findByIdAndUpdate(
                    post.owner,
                    {
                        $push: {
                            posts: savePost._id,
                        }
                    },
                );

                const newPost = await Post.findById(savePost._id).populate('owner', '-userName -password -follows -hasFollowers');
                return res.status(201).send(newPost);
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    async getAll(req, res, next) {
        try {
            const userId = req.params.userId;
            const postIdArr = [];

            const user = await User.findOne({
                _id: userId
            }).populate('follows');

            const reportFromUser = await Report.find({
                fromUser: userId,
                post: {
                    $ne: null
                }
            });

            const reports = await Report.find({
                post: {
                    $ne: null
                }
            }).populate('post');

            reportFromUser.forEach(report => {
                postIdArr.push(report.post)
            })

            reports.forEach(report => {
                if(report.post.owner == userId && report.status == 1) {
                    postIdArr.push(report.post._id);
                }
            })

            const posts = await Post.find({
                _id: {
                    $nin: postIdArr,
                }
            }).populate('owner', '-userName -password').populate('likes');

            posts.filter(
                post =>
                    !post.owner.private
                    || post.owner._id == userId
                    || user.follows.some(follow => follow.followUser == post.owner._id && follow.state == true)
            )

            return res.status(200).json(posts);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    async getById(req, res, next) {
        try {
            const postId = req.params.postId;
            const userId = req.params.userId;

            const report = await Report.findOne({
                fromUser: userId,
                post: postId
            });

            if(report) return res.status(404).json(report);

            const post = await Post.findById(postId).populate('owner', '-userName -password -follows -hasFollowers').populate('likes');
            return res.status(200).json(post);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async deleteById(req, res, next) {
        try {
            const postId = req.params.id;

            const deletedPost = await Post.findByIdAndDelete(postId);
            if (deletedPost) {
                const updateUser = await User.findByIdAndUpdate(
                    deletedPost.owner,
                    {
                        $pullAll: {
                            posts: [deletedPost._id],
                        }
                    },
                    {
                        password: 0,
                        userName: 0,
                    }
                )
                const deletedComments = await Comment.deleteMany({
                    belongToPost: postId,
                })
                return res.status(200).send({ deletedPost, updateUser });
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    async savedPost(req, res, next) {
        try {
            const postId = req.body.postId;
            const userId = req.body.userId;

            const post = await Post.findById(postId);

            if (!post) return res.status(404).send("Post not found");


            const updateUser = await User.findByIdAndUpdate(
                userId,
                {
                    $push:
                    {
                        savedPosts: post._id
                    }
                }
            )

            return res.status(201).send(post);
        } catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    }

    async removeSavedPost(req, res, next) {
        try {
            const postId = req.body.postId;
            const userId = req.body.userId;

            const post = await Post.findById(postId);

            if (!post) return res.status(404).send("Post not found");

            const updateUser = await User.findByIdAndUpdate(
                userId,
                {
                    $pullAll:
                    {
                        savedPosts: [post._id],
                    },
                },
            );

            return res.status(200).send(post);
        } catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    }
}

module.exports = new MessageService;