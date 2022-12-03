const { Socket } = require('dgram');
const express = require('express');
const http = require('http');
const { default: mongoose } = require('mongoose');
const { Server } =  require('socket.io')

// Initailzing app
const app = express();

// Initializing socket Server
const server = http.createServer(app);
const io = new Server(server,{cors: {origin:"*"}});

var { chats } = require('../schema/schema');

io.on("connection", (socket)=> {
    console.log("User Online");
    // socket.emit('1','Working')
    socket.on("join", (data)=>{
        let roomData;
        console.log(data);
        chats.findOne(({activeUsers: {$all: data.activeUsers}}), async(err, res) => {
            if(res !== null) {
                roomData = res;
            } else {
                let users = new chats({...data, createdAt: new Date()});
                users['_id'] = mongoose.Types.ObjectId().toString();
                roomData = await users.save();
            }
            socket.join(roomData._doc._id);

            io.to(roomData._doc.id).emit('online','test');
        });
        
        socket.on('new_message', data => {
            console.log(data);
            socket.in(roomData._doc._id).emit("online", data);
        })
        // io.join(data.roomId)
    })
})

server.listen(5000, () => {
    console.log("Socket is running on port 5000");
  })
  