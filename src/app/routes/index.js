const postRoute = require('./post.route');
const authRoute = require('./auth.route');
const commentRoute = require('./comment.route');
const likeRoute = require('./like.route');
const likeCommentRoute = require('./likeComment.route');
const followRoute = require('./follow.route');
const conversationRoute = require('./conversation.route');
const messageRoute = require('./message.route');
const searchRoute = require('./search.route');
const notificationRoute = require('./notification.route');

function route(app) {
    app.use('/api/posts', postRoute);
    app.use('/api/auth', authRoute);
    app.use('/api/comments', commentRoute);
    app.use('/api/like', likeRoute);
    app.use('/api/likeComment', likeCommentRoute);
    app.use('/api/follow', followRoute);
    app.use('/api/conversation', conversationRoute);
    app.use('/api/message', messageRoute);
    app.use('/api/search', searchRoute);
    app.use('/api/notification', notificationRoute);
};

module.exports = route;