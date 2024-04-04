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
            // const sender = socket.handshake.auth.name;
            // console.log(socket.handshake.auth);

            socket.broadcast.emit('welcome' ,{name: "captain jack sparrow"});
            
            socket.on('new-user' , name => {
                socket.broadcast.emit('newUser' , name);
            });

            socket.on('sendGroupMessage' , data => {
                // console.log(data , "received on the server");
                socket.broadcast.emit('receiveGroupMessage' , data);
            });

            socket.on('sendPersonalMessage' , data => {
                // console.log(data , "received on the server");
                socket.broadcast.emit('receivePersonalMessage' , data);
            });

            socket.on('disconnect' , async (sender) => {
                // console.log("A user disconnected");
                socket.broadcast.emit('userLeftGroup' , sender);
            });
        });
    }
    else {
        console.log("Socket is already running");    
    }
    res.end();
}

