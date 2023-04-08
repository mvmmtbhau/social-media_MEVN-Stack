const { Follow, User } = require('../models/');
const mongoose = require('mongoose');

class FollowService {
    async create(req, res, next) {
        try {
            const fromUser = req.body.fromUser;
            const followUser = req.body.followUser;
            
            const follow = new Follow({
                fromUser: fromUser,
                followUser: followUser._id,
                state: followUser.private ? false : true,
            });

            const saveFollow = await follow.save();

            if (saveFollow) {
                const newFollow = await Follow.findById(follow._id)
                    .populate('fromUser', '-userName -password')
                    .populate('followUser', '-userName -password');
                const updateUserFollowing = await User.findByIdAndUpdate(
                    follow.fromUser,
                    {
                        $push: {
                            follows: follow._id,
                        }
                    },
                );

                const updateUserFollowed = await User.findByIdAndUpdate(
                    follow.followUser,
                    {
                        $push: {
                            hasFollowers: follow._id,
                        }
                    },
                );

                return res.status(201).send(newFollow);
            }

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

    async delete(req, res, next) {
        try {
            const fromUser = req.params.fromUserId;
            const followUser = req.params.followUserId;

            const follow = await Follow.findOne({
                fromUser: fromUser,
                followUser: followUser,
            })

            const result = await Follow.findByIdAndDelete({
                _id: follow._id,
            });

            if (result) {
                const updateUserFollwing = await User.findByIdAndUpdate(
                    fromUser,
                    {
                        $pullAll: {
                            follows: [follow._id],
                        }
                    }
                );

                const updateUserFollwed = await User.findByIdAndUpdate(
                    followUser,
                    {
                        $pullAll: {
                            hasFollowers: [follow._id],
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

    async update(req, res, next) {
        try {
            const followId = req.params.followId;

            const getFollow = await Follow.findById(req.params.followId);

            if (!getFollow) return res.status(204).send("Yêu cầu không tồn tại");

            const updateFollow = await Follow.findByIdAndUpdate(
                followId,
                {
                    state: true,
                }
            )
            return res.status(200).send(updateFollow);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = new FollowService;