import { Server } from "socket.io";

export default async function SocketHandler(req, res) {
    if (!res.socket.server.io) {
        // console.log("New Socket.io server...");
        const io = new Server(res.socket.server, {
            path: "/api/socket_io", 
            addTrailingSlash: false,
            // cors: { origin: '*' },
        });
        res.socket.server.io = io;

        io.on("connection", (socket) => {
            socket.broadcast.emit('welcome' ,{name: "captain jack sparrow"});
            
            socket.on('new-user' , ({name , _id}) => {
                // console.log(name , _id);
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

            socket.on('user-disconnected' , ({name , _id}) => {
                // console.log("Pre disconnection emit" , name , _id );
                socket.broadcast.emit('userLeftGroup' , name);
            });
            socket.on('disconnect' , async (sender) => {
                // console.log("A user disconnected" );
            });
        });
    }
    res.end();
}

