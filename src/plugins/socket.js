import SocketIO from "socket.io-client";

const URL = "http://localhost:3000";
const socket = SocketIO(
    URL,
    {
        autoConnect: false,
    },
);

export default socket;