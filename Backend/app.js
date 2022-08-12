const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require('cors');
const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);
app.use(cors())

const server = http.createServer(app);

const io = socketIo(server);

let interval;
let JSONTestList = [{id:2, word:"Nisil"}, {id:1, word:"Mike"}, {id:4, word:"Nisil"}, {id:1, word:"JSON"} ]

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on('requestJSON',function (data) {
    getJSONAndEmit(socket)
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getJSONAndEmit = socket => {
  let response;
  if(JSONTestList.length == 0){
    response = {id:11, word:""};
  }
  else{
    response = JSONTestList[JSONTestList.length-1];
    JSONTestList.pop();
  }
  
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromJSON", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
