import { Server } from "socket.io";
let map = new Map();
let existingUsers = new Set();

export default async function SocketHandler(req, res) {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server, {
            path: "/api/socket_io",
            addTrailingSlash: false,
        });
        res.socket.server.io = io;

        io.on("connection", (socket) => {

            socket.on('new-user', async ({ name, _id }) => {
                socket.join(_id);
                existingUsers.add(_id);
                map.set(socket.id, _id);
                const room = io.sockets.adapter.rooms.get(_id);
                if (room.size === 1) {
                    socket.broadcast.emit('newUserInGroup', name);
                    socket.broadcast.emit("online-status", { _id, status: true })
                }
                socket.emit("existingOnline", Array.from(existingUsers));
            });

            socket.on('loadOnlineUsers', _id => {
                socket.emit("existingOnline", Array.from(existingUsers));
            });

            socket.on('sendGroupMessage', data => {
                socket.broadcast.emit('receiveGroupMessage', data);
            });

            socket.on('sendPersonalMessage', data => {
                socket.to(data.receiverId).emit('receivePersonalMessage', data);
            });

            socket.on('disconnect', async () => {
                const _id = map.get(socket.id);
                const room = io.sockets.adapter.rooms.get(_id);
                if (!room || room.size === 0) {
                    existingUsers.delete(_id);
                    socket.broadcast.emit("online-status", { _id, status: false });
                    socket.broadcast.emit('userLeftGroup', { _id });
                }
                map.delete(socket.id);
            });
        });
    }
    res.end();
}
