import express from 'express';
import http from 'http';
import { Server } from "socket.io";
const app = express();
import { joinQueue, leaveQueue } from './tokenGenerator';
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket)=>{
    console.log("socket connected");


    socket.on("joinQueue", ({ canteenName, orders })=>{
        const token = joinQueue(canteenName, orders);
        socket.emit("joinedQueue", { token });
        io.to(canteenName).emit("queueUpdate", canteens[canteenName].queue);
        res.send(token);
    })

    socket.on("leaveQueue", ({ canteenName, token }) =>{
        leaveQueue(canteenName, token);
        io.to(canteenName).emit("queueUpdate", canteens[canteenName].queue);
    })



    socket.on("disconnect", ()=>{
        console.log("socket disconnected");
    })
})



server.listen(3000, () =>{
    console.log("server running on 3000");
})