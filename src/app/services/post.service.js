const { Post, User, Comment } = require('../models/');
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
            return res.status(200).send(
                await Post.find({}).populate('owner', '-userName -password -follows -hasFollowers').populate('likes')
            );
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

            if(!post) return res.status(404).send("Post not found");
            

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

            if(!post) return res.status(404).send("Post not found");
            
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