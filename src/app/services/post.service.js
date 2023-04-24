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

            const report = await Report.find({
                fromUser: userId,
            })

            report.forEach(report => {
                report.post ? postIdArr.push(report.post) : ''
            })

            const posts = await Post.find({
                _id: {
                    $nin: postIdArr,
                }
            }).populate('owner', '-userName -password');

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
            const postId = req.params.id;
            const post = await Post.findById(postId).populate('owner', '-userName -password -follows -hasFollowers').populate('likes');
            return res.status(200).send(post);
        } catch (err) {
            return res.status(500).send(err);
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