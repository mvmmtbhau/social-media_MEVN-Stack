const { User, Search, Notification, Report, Post } = require('../models/');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

class AuthService {
    async register(req, res, next) {
        try {
            const filterUser = await User.findOne({
                userName: req.body.userName,
            });

            if (filterUser) {
                return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
            }

            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const user = new User({
                fullName: req.body.fullName,
                userName: req.body.userName,
                password: hash,
            });

            const response = await user.save();
            if (response) {
                const newHistory = await Search.create({
                    owner: response._id,
                });
                return res.status(201).json(response);
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    async login(req, res, next) {
        try {
            const filterUser = await User.findOne({
                userName: req.body.userName,
            }).populate('posts')
                .populate({
                    path: 'follows',
                    populate: {
                        path: 'followUser',
                        select: '-userName -password',
                    }
                })
                .populate({
                    path: 'hasFollowers',
                    populate: {
                        path: 'fromUser',
                        select: '-userName -password',
                    }
                });

            if (!filterUser) return res.status(400).json('Tên đăng nhập hoặc mật khẩu không đúng');

            const checkPassword = bcrypt.compareSync(req.body.password, filterUser.password);

            if (!checkPassword) {
                return res.status(400).json('Tên đăng nhập hoặc mật khẩu không đúng');
            };

            const jwtToken = jwt.sign({ ...filterUser._doc }, process.env.SECRET_JWT, {
                expiresIn: (3600 * 2),
            });

            return res.status(200).json({
                message: 'Đăng nhập thành công',
                accessToken: jwtToken
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getUserById(req, res, next) {
        try {
            const userId = req.params.id;

            const user = await User.findOne({
                _id: userId,
            }, {
                userName: 0,
                password: 0,
            })
                .populate('savedPosts')
                .populate('posts')
                .populate({
                    path: 'follows',
                    populate: {
                        path: 'followUser',
                        select: '-userName -password',
                    }
                })
                .populate({
                    path: 'hasFollowers',
                    populate: {
                        path: 'fromUser',
                        select: '-userName -password',
                    }
                });

            let postIdArr = [];

            const reportsPost = await Report.find({
                fromUser: req.userId,
                post: {
                    $ne: null
                },
            });

            reportsPost.forEach(report => {
                postIdArr.push(report.post);
            })

            if (userId != req.userId) {
                const posts = await Post.find({
                    _id: {
                        $nin: postIdArr,
                    },
                    owner: userId,
                });

                user.posts = posts;
            }

            return res.status(200).send(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

    async update(req, res, next) {
        try {
            const update = {
                avatar: req.files[0],
                fullName: req.body.fullName,
                bio: req.body.bio,
                gender: req.body.gender,
                userId: req.body.userId
            }
            if (!update.avatar && update.bio) {
                const updateUser = await User.findByIdAndUpdate(
                    update.userId,
                    {
                        fullName: update.fullName,
                        bio: update.bio,
                        gender: update.gender,
                    }
                )
                if (updateUser) {
                    const user = await User.findById(update.userId, { userName: 0, password: 0 })
                        .populate('posts').
                        populate('follows', '-userName -password')
                        .populate('hasFollowers', '-userName -password');;
                    return res.status(200).send(user);
                }
            }

            if (!update.bio && update.avatar) {
                const updateUser = await User.findByIdAndUpdate(
                    update.userId,
                    {
                        fullName: update.fullName,
                        gender: update.gender,
                        avatar: update.avatar,
                    }
                );
                if (updateUser) {
                    const user = await User.findById(update.userId, { userName: 0, password: 0 })
                        .populate('posts').
                        populate('follows', '-userName -password')
                        .populate('hasFollowers', '-userName -password');;
                    return res.status(200).send(user);
                }
            }

            if (!update.bio && !update.avatar) {
                const updateUser = await User.findByIdAndUpdate(
                    update.userId,
                    {
                        fullName: update.fullName,
                        bio: update.bio,
                        avatar: update.avatar,
                        gender: update.gender,
                    }
                );
                if (updateUser) {
                    const user = await User.findById(update.userId, { userName: 0, password: 0 })
                        .populate('posts').
                        populate('follows', '-userName -password')
                        .populate('hasFollowers', '-userName -password');;
                    return res.status(200).send(user);
                }
            }

            const updateUser = await User.findByIdAndUpdate(
                update.userId,
                {
                    fullName: update.fullName,
                    bio: update.bio,
                    avatar: update.avatar,
                    gender: update.gender,
                }
            );
            if (updateUser) {
                const user = await User.findById(update.userId, { userName: 0, password: 0 })
                    .populate('posts').
                    populate('follows', '-userName -password')
                    .populate('hasFollowers', '-userName -password');;
                return res.status(200).send(user);
            }

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

    async changePassword(req, res, next) {
        try {
            const userId = req.body.userId;
            const password = req.body.password;
            const newPass = req.body.newPass;

            const user = await User.findById(userId);

            const checkPass = bcrypt.compareSync(password, user.password);

            if (!checkPass) return res.status(409).send('Mật khẩu không đúng, xin nhập lại.');

            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(newPass, salt);

            const updateUser = await user.update(
                {
                    password: hash,
                }
            )

            return res.status(201).send("Đổi mật khẩu thành công");

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

    async changePrivateState(req, res, next) {
        try {
            const userId = req.params.id;

            const user = await User.findById(userId);

            const newState = user.private ? false : true;

            const updateUser = await User.findByIdAndUpdate(
                userId,
                {
                    private: newState,
                }
            );
            if (updateUser) {
                return res.status(200).send({
                    newState,
                    message: newState ? 'Chuyển đổi tài khoản riêng tư thành công.' : 'Chuyển đổi tài khoản công khai thành công.'
                });
            }

        } catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    }

    async getAll(req, res, next) {
        try {
            const userId = req.params.id;

            const user = await User.findById(userId).populate({
                path: 'follows',
                populate: {
                    path: 'followUser',
                    select: '-uesrName -password'
                }
            });

            const newArr = [];
            user.follows.forEach(user => {
                newArr.push(user.followUser._id);
            });

            const users = await User.find({
                _id: {
                    $nin: newArr,
                    $ne: userId,
                },
                role: {
                    $ne: 'admin'
                }
            }).populate({
                path: 'follows',
                populate: {
                    path: 'followUser',
                    select: '-userName -password',
                }
            }).limit(req.query.limit);

            return res.status(200).send(users);
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}

module.exports = new AuthService;