const { Search, User } = require('../models/');
const mongoose = require('mongoose');

class SearchService {
    async search(req, res, next) {
        try {
            const searchKey = req.params.key;
            const userId = req.params.userId;

            const pattern = "[\\s]" + searchKey + "|^" + searchKey;

            const result = await User.find({
                fullName: {
                    $regex: pattern,
                    $options: 'i',
                },
                _id: {
                    $ne: userId,
                },
                role: {
                    $ne: 'admin'
                }
            }, {
                userName: 0,
                password: 0,
                posts: 0,
                follows: 0,
                hasFollowers: 0,
                phone: 0,
                bio: 0,
            });

            if (result) {
                return res.status(200).send(result);
            }

        } catch (err) {
            return res.status(500).send(err);
        }
    }

    async save(req, res, next) {
        try {
            const userId = req.body.userId;
            const newSearch = req.body.newSearch;

            const searchHistory = await Search.findOne({
                owner: userId,
            });

            if (!searchHistory.histories.some(h => h == newSearch._id)) {
                const updateHistory = await Search.findByIdAndUpdate(
                    searchHistory._id,
                    {
                        $push:
                        {
                            histories: newSearch._id,
                        }
                    }
                )
                return res.status(201).send(newSearch);
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    async getByUserId(req, res, next) {
        try {
            const userId = req.params.userId;

            const histories = await Search.findOne({
                owner: userId
            }).populate('histories', '-password -userName -email -follows -hasFollowers -phone')

            return res.status(200).send(histories);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    async updateWithRemove(req, res, next) {
        try {
            const history = req.body.history;
            const owner = req.body.owner;

            const updateHistory = await Search.findOneAndUpdate({
                owner: owner,
            }, {
                $pullAll: {
                    histories: [history._id],
                }
            })
            if (updateHistory) {
                return res.status(200).send(updateHistory);
            }

        } catch (err) {
            return res.status(500).send(err);
        }
    }

    async updateWithRemoveAll(req, res, next) {
        try {

            const search = req.body;

            const updateHistory = await Search.findByIdAndUpdate(
                search._id,
                {
                    $set:
                    {
                        histories: [],
                    }
                },
                {
                    multi: true,
                }
            )
            if (updateHistory) {
                return res.status(200).send(updateHistory);
            }

        } catch (err) {
            return res.status(500).send(err);
        }
    }
}

module.exports = new SearchService;