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
            if(users.some((user,index) => user.userId === userId)) 
            {
              users =   users.filter(user => user.userId != userId);
                users.push({ userId, socketId });
            }else{
                users.push({ userId, socketId });
            }
    };

    const removeUser = (socketId) => {
        users = users.filter((user) => user.socketId !== socketId);
    };

    const getUser = (userId) => {
        const user = users.reverse().find((user) => user.userId === userId);
        return user;
    };

    io.on("connect", (socket) => {
        socket.on("addUser", async (userId) => {
            if (userId) {
                addUser(userId, socket.id);
            }

            io.emit("getUsers", users);
        });

        socket.on("sendMessage", async (data) => {
            const user = await getUser(data.receiver);

            const message = {
                message: data.message,
                sender: data.sender
            }
            
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
                io.to(user.socketId).emit("getLikePost", data);
            }
        });

        socket.on("likeComment", async (data) => {
            const user =  await getUser(data.toUser._id);
            console.log(user);

            if(user && user.socketId){
                io.to(user.socketId).emit("likeComment", data);
            }
        });

        socket.on('deleteComment', async (userId) => {
            const user = await getUser(userId);
            if(user && user.socketId) {
                io.to(user.socketId).emit('deleteComment');
            }
        })

        socket.on('deletePost', async (userId) => {
            const user = await getUser(userId);
            if(user && user.socketId) {
                io.to(user.socketId).emit('deletePost');
            }
        })

        socket.on('reportPost', async (userId) => {
            const user = await getUser(userId);
            if(user && user.socketId) {
                io.to(user.socketId).emit('reportPost');
            }
        })

        socket.on('reportComment', async (userId) => {
            const user = await getUser(userId);
            if(user && user.socketId) {
                io.to(user.socketId).emit('reportComment');
            }
        })

        socket.on("disconnected", () => {
            console.log({socket});
            socket.broadcast.emit("userDisconnected", socket.id);
        });

    });
}

module.exports = createSocketIO;