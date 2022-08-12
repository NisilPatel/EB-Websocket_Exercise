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
let empty = false;

//Added more objects with id between 1 and 10
let JSONTestList = [{id:2, word:"Nisil"}, {id:1, word:"Mike"}, {id:4, word:"Nisil"}, {id:1, word:"JSON"} ];

io.on("connection", (socket) => {
  console.log("New client connected");

 
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    if(empty == false){
      getJSONAndEmit(socket);
    }
  }, 5000);
  

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getJSONAndEmit = socket => {
  let response;
  if(JSONTestList.length == 0){
    empty = true;
    response = {id:5,word:"finished"};
  }
  else{
    response = JSONTestList[JSONTestList.length-1];
    JSONTestList.pop();
  }
  
  console.log("Emiting data", response);
  socket.emit("FromJSON", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
