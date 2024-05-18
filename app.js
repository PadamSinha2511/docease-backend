const app = require("./index")
const {connectToDb} = require("./config/db")

connectToDb();







const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running  at port ${process.env.PORT}`)
})



const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      // credentials: true,
    },
  });

io.on('connection',(socket)=>{
    console.log("New Connection established")


  
       
        socket.on("setup", (userData) => {
          socket.join(userData._id);
          socket.emit("connected");
    })

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
      });

      socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        // console.log(newMessageRecieved);
        if (!chat.users) return console.log("chat.users not defined");
    
        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;
    
          socket.in(chat._id).emit("message recieved", newMessageRecieved);
        });
      });


      socket.on("disconnect", (userData) => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
})