const app = require("./index")
const {connectToDb} = require("./config/db")
const http = require("http")
const socketIo = require("socket.io")
connectToDb();


const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your frontend URL
   
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.set('socketio', io); // Store io instance in app

server.listen(process.env.PORT,() => {
  console.log(`Server is running at ${process.env.PORT}`);
});