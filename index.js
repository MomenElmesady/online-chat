const express = require("express")
const {join} = require("path")
const http = require("http")
const {Server} = require("socket.io")

const app = express()
const server = http.createServer(app)

const io = new Server(server)

io.on("connection",(socket)=>{
    console.log(`user ${socket.id} connected`)

    socket.on('message', (msg) => {
        console.log('message: ' + msg);

        io.emit('send_messages_to_all_users',msg)
    });
    socket.on("typing",()=>{
        socket.broadcast.emit("show_typing_status")
    })
    socket.on("stop_typing",()=>{
        socket.broadcast.emit("clear_typing_status")
    })
})
app.get("/",(req,res)=>{
    res.sendFile(join(__dirname,"index.html"))
})


server.listen(3636,()=>{
    console.log("listen")
})