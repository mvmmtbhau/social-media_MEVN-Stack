const socketIO = require('socket.io');

const createSocketIO = (httpServer) => {
    const io = socketIO(httpServer, {
        allowEIO3: true,
        cors: {
            origin: true,
            creadentials: true,
        },
    });

    let users = [];

    const addUser = (userId, socketId) => {
        !users.some((user) => user.userId === userId) &&
            users.push({ userId, socketId });
    };

    const removeUser = (socketId) => {
        users = users.filter((user) => user.socketId !== socketId);
    };

    const getUser = (userId) => {
        const user = users.find((user) => user.userId === userId);
        return user;
    };

    io.on("connect", (socket) => {
        socket.on("addUser", async (userId) => {
            if (userId) {
                addUser(userId, socket.id);
            }
            
            console.log("a user connected", users);
            io.emit("getUsers", users);
        });

        socket.on("sendMessage", async (data) => {
            const user = await getUser(data.receiver);
            console.log(user);
            const message = {
                message: data.message,
                sender: data.sender
            }
            console.log(message);
            if (user && user.socketId) {
                io.to(user?.socketId).emit("getMessage", message);
            }
        });

        socket.on("createComment", async (data) => {
            const user = await getUser(data.toUser._id);
            if (user && user.socketId) {
                io.to(user.socketId).emit("getComment", data);
            }
        });

        socket.on("createPost", async (data) => {
            console.log(data);

            const user = await getUser(data.owner._id);
            if (user && user.socketId) {
                io.to(user.socketId).emit("getPost", data);
            }
        });

        socket.on("likePost", async (data) => {
            const user =  await getUser(data.toUser._id);

            if(user && user.socketId){
                io.to(user.socketId).emit("getLike", data);
            }
        });

        socket.on("disconnected", () => {
            socket.broadcast.emit("userDisconnected", socket.id);
        });

    });
}

module.exports = createSocketIO;