import { Server } from "socket.io";
import Users from "/mongo/UserModel";
let map = new Map();

export default async function SocketHandler(req, res) {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server, {
            path: "/api/socket_io",
            addTrailingSlash: false,
            // cors: { origin: '*' },
        });
        res.socket.server.io = io;

        io.on("connection", (socket) => {
            let userId = socket.id;
            socket.broadcast.emit('welcome', { name: "captain jack sparrow" });

            socket.on('new-user', async ({ name, _id }) => {
                map.set(userId , _id);
                socket.join(_id);
                socket.broadcast.emit("online-status", { _id, status: true })
                socket.broadcast.emit('newUser', name);
            });

            socket.on('sendGroupMessage', data => {
                socket.broadcast.emit('receiveGroupMessage', data);
            });

            socket.on('sendPersonalMessage', data => {
                socket.to(data.receiverId).emit('receivePersonalMessage', data);
                // socket.broadcast.emit('receivePersonalMessage', data);
            });

            socket.on('disconnect', async () => {
                const key = socket.id;
                const _id = map.get(key);
                let user = await updateStatus(_id);
                socket.broadcast.emit("online-status", { _id, status: user?.isOnline > 0 });
                socket.broadcast.emit('userLeftGroup', { Name: user?.name });
                map.delete(key);
            });
        });
    }
    res.end();
}



const updateStatus = async (_id) => {
    let user = await Users.findOne({ _id });
    if (user) {
        user.isOnline -= (Number)(user?.isOnline) > 0 ? 1 : 0;
        await user.save();
    }
    return user;
}