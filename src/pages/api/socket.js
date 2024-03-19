// // pages/api/socket.js
// const { Server } = require("socket.io");

// export default function SocketHandler(req , res) {
//   if (res.socket.server.io) {
//     console.log("Socket is already running");
//   } else {
//     console.log("Socket is initializing");

//     const io = new Server(res.socket.server, {
//       path: "/api/socket_io",
//       addTrailingSlash: false
//     });
    
//     res.socket.server.io = io;

//     io.on("connection", (socket) => {
//       console.log("client connected", socket.id);
      
//       // socket.on('sending_message' , (data) => {
//       //   console.log("message sending" , data);
//       //   // io.emit("receive-message", obj);
//       //   socket.broadcast.emit('receiving_message');
//       // });

//       socket.on('disconnect', () => {
//         console.log('A user disconnected');
//       });      
//     });
//   }
  
//   res.end();
// }

// pages/api/socket.ts
import { NextResponse } from "next/server";
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
            socket.broadcast.emit('welcome' ,{name: "captain jack sparrow"});
            console.log("Client connected");
            
            socket.on('new-user' , name => {
                socket.broadcast.emit('newUser' , name);
            });

            socket.on('sendMessage' , data => {
                console.log(data , "received on the server");

                socket.broadcast.emit('receiveMessage' , data);
            })

            socket.on('disconnect' , async () => {
                console.log("A user disconnected");
            });
        });
    }
    else {
        console.log("Socket is already running");        
    }
    res.end();
    // return NextResponse.json({success:true})
}
