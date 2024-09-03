import { Server } from "socket.io";
import Users from "/mongo/UserModel";
let map = new Map();
let online = new Map();

export default async function SocketHandler(req, res) {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server, {
            path: "/api/socket_io",
            addTrailingSlash: false,
        });
        res.socket.server.io = io;

        io.on("connection", (socket) => {
            // console.log("connected...");
            let userId = socket.id;
            socket.broadcast.emit('welcome', { name: "captain jack sparrow" });

            socket.on('new-user', async ({ name, _id }) => {
                // console.log("new-user...");
                if(map.has(_id)) {
                    online.set(_id , online.get(_id)+1);
                } else {
                    online.set(_id, 1);
                }
                await updateStatus(_id, true);
                map.set(userId , _id);
                socket.join(_id);
                socket.broadcast.emit("online-status", { _id, status: true })
                socket.broadcast.emit('newUser', name);
            });

            socket.on('sendGroupMessage', data => {
                // console.log("sendGroupMessage...");
                socket.broadcast.emit('receiveGroupMessage', data);
            });

            socket.on('sendPersonalMessage', data => {
                // console.log("sendPersonalMessage...", data);
                socket.to(data.receiverId).emit('receivePersonalMessage', data);
            });

            socket.on('disconnect', async () => {
                // console.log("disconnected...");
                const key = socket.id;
                const _id = map.get(key);
                let user = await updateStatus(_id, false);
                socket.broadcast.emit("online-status", { _id, status: user?.isOnline > 0 });
                socket.broadcast.emit('userLeftGroup', { Name: user?.name });
                map.delete(key);
                online.set(_id , online.get(_id)-1);
                if(online.get(_id) == 0) {
                    online.delete(_id);
                }
            });
        });
    }
    res.end();
}



const updateStatus = async (_id , add) => {
    let user = await Users.findOne({ _id });
    const online = (Number)(user?.isOnline);
    if (user) {
        if(add) {
            user.isOnline = online + 1;
        } else {
            user.isOnline = online - 1;
        }
        await user.save();
    }
    return user;
}