import { Server } from "socket.io";

export default async function SocketHandler(req, res) {
    if (!res.socket.server.io) {
        console.log("New Socket.io server...");
        const io = new Server(res.socket.server, {
            path: "/api/socket_io", 
            addTrailingSlash: false,
            // cors: { origin: '*' },
        });
        res.socket.server.io = io;



        io.on("connection", (socket) => {
            // console.log("Client connected");
            socket.broadcast.emit('welcome' ,{name: "captain jack sparrow"});
            
            socket.on('new-user' , name => {
                socket.broadcast.emit('newUser' , name);
            });

            socket.on('sendMessage' , data => {
                // console.log(data , "received on the server");
                socket.broadcast.emit('receiveMessage' , data);
            });

            socket.on('sendSoloMessage' , data => {
                // console.log(data , "received on the server");
                socket.broadcast.emit('receiveSoloMessage' , data);
            });

            socket.on('disconnect' , async (name) => {
                socket.broadcast.emit('userDisconnected' , name);
                // console.log("A user disconnected");
            });
        });
    }
    else {
        console.log("Socket is already running");    
    }
    res.end();
}

