export function handleSockets(io, canteens){
    io.on("connection", (socket)=>{
    console.log("socket connected");


    socket.on("joinQueue", ({ canteenName, orders })=>{
        const token = joinQueue(canteenName, orders);
        socket.emit("joinedQueue", { token });
        io.to(canteenName).emit("queueUpdate", canteens[canteenName].queue);
        // res.send(token);
    })

    socket.on("leaveQueue", ({ canteenName, token }) =>{
        leaveQueue(canteenName, token);
        io.to(canteenName).emit("queueUpdate", canteens[canteenName].queue);
    })

    socket.on("disconnect", ()=>{
        console.log("socket disconnected");
    })
})

}