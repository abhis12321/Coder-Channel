import { Server } from "socket.io";
// import Users from "/mongo/UserModel";
let map = {};

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
            // console.log(socket);
            let sktid = socket.id;
            socket.broadcast.emit('welcome' ,{name: "captain jack sparrow"});
            
            socket.on('new-user' , async({name , _id}) => {
                map[sktid] = _id;
                socket.broadcast.emit("online-status" , {_id , status:true})
                socket.broadcast.emit('newUser' , name);
                // await Users.findOneAndUpdate({_id}, {$set:{isOnline:true}});
            });

            socket.on('sendGroupMessage' , data => {
                // console.log(data , "received on the server");
                socket.broadcast.emit('receiveGroupMessage' , data);
            });

            socket.on('sendPersonalMessage' , data => {
                // console.log(data , "received on the server");
                socket.broadcast.emit('receivePersonalMessage' , data);
            });

            socket.on('user-disconnected' , async({name , _id}) => {
                socket.broadcast.emit("online-status" , {_id , status:false});
                socket.broadcast.emit('userLeftGroup' , name);
                // await Users.findOneAndUpdate({_id}, {$set:{isOnline:false}});
            });
            socket.on('disconnect' , async (sender) => {
                // console.log(sender);
                socket.broadcast.emit("online-status" , {_id:map[sktid], status:false});
                delete map[sktid];
                // console.log("A user disconnected" );
            });
        });
    }
    res.end();
}

