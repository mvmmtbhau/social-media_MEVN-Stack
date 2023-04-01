const { Follow, User } = require('../models/');
const mongoose = require('mongoose');

class FollowService {
    async create(req, res, next) {
        const follow = new Follow({
            owner: req.body.owner,
            userFollowed: req.body.userFollowed,
        });

        try {
            const newFollow = await follow.save();

            if (newFollow) {
                const updateUserFollowing = await User.findByIdAndUpdate(
                    follow.owner,
                    {
                        $push: {
                            follows: follow._id,
                        }
                    },
                    { new: true, useFindAndModify: false },
                );

                const updateUserFollowed = await User.findByIdAndUpdate(
                    follow.userFollowed,
                    {
                        $push: {
                            hasFollowers: follow._id,
                        }
                    },
                    { new: true, useFindAndModify: false },
                );
            }
            return res.status(201).send(newFollow);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

    async delete(req, res, next) {
        const userFollowed = req.params.userFollowed;
        const owner = req.params.userFollowing;
        try {
            const follow = await Follow.findOne({
                userFollowed: userFollowed,
                owner: owner,
            });

            const result = await Follow.findByIdAndDelete(follow._id);

            if (result) {
                const updateUserFollwing = await User.findByIdAndUpdate(
                    owner,
                    {
                        $pullAll: {
                            follows: [follow._id],
                        }
                    }
                );

                const updateUserFollwed = await User.findByIdAndUpdate(
                    userFollowed,
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
}

module.exports = new FollowService;