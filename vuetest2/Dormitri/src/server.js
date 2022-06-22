const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const bodyParser = require("body-parser");
const postRoutes = require('./routes/postRoutes');
const app = express();
const socket = require("socket.io");
const commentRoutes = require('./routes/commentRoutes');
const bookRoutes = require('./routes/bookRoutes');
const photoRoutes = require('./routes/photoRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
//Here we are configuring express to use body-parser as middle-ware.
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/post',postRoutes);
app.use('/comment', commentRoutes);
app.use('/booking', bookRoutes);
app.use('/photo', photoRoutes);
app.use('/announcement', announcementRoutes);
// main server for handling mongodb related services
const server = app.listen(4000, function () {
  console.log("server running on port 4000");
});
// express server for handling picture requests
const picapp = express();
picapp.use(express.static('tmp'));
picapp.listen(8000, ()=>{
  console.log("picture server running on port 8000")
})
//socket.io service for handling socket services
const io = socket(server, {
  allowEIO3: true,
  cors: {
      credentials: true,
      origin: 'http://localhost:3000',
      method: ["GET","POST"]
  },
});
// store online admin list
var adminList = [

]
// store online user list
var userList = [

]
io.on("connection", function (socket) {
  console.log(`${socket.id} connected`);

  //login event
  socket.on('login', (payload,callback)=>{
    console.log(`${payload._id} attempted to login.`)
    var checkLogin = true;
    // if user has been in the list
    io.sockets.sockets.forEach(element => {
      if(element.name == payload._id) {
        checkLogin = false;
      }
    });
    // check status
    if(checkLogin){
      console.log('Login successful',payload._id);
      socket.name=payload._id;
      callback(true);
      //if is admin, 
      if(payload.identity=="admin") {
        //push into admin list
        adminList.push(payload);
        //update to vuex
        io.emit('adminLogin',adminList);
        console.log(`updated adminlist with ${payload._id}`)

      }
      else {//else return admin list for user
        
        /*no need for userList update now. we only update when user send message (privatechat)
        io.emit('userLogin',userList);
        console.log(`updated userlist with ${payload._id}`);*/
        // update current admin list to the new user
        io.emit('adminLogin',adminList);
      }
      //let socket name = user id
    }
    // else if login failed
    else{
        console.log('Login failed (user has logged in):',payload._id);
        callback(false);
    }
  })
  socket.on('privateChat',data=>{
    // get the private chat admin
    io.sockets.sockets.forEach(element=>{
        if(element.name==data.receiver._id){
          //convert from 'my' to 'user' indicating it is sender's message for the counterpart
            data.type='user';
            
            //update user list if not in current list
            var flag = true;
            //if get repeated senderID in the list, return false
            userList.forEach(usr=>
              {
                if (usr._id==data.sender._id){
                  flag = false;
                }
              }
            )
            // update user list if didnt find replicas and message sender is not admin
            if(flag && data.sender.identity!='admin') {
              userList.push(data.sender);
              io.emit('userLogin',userList);
              console.log(`updated userlist with ${data.sender._id}`);
            }
            io.to(element.id).emit('updateChatMessageList',data);

        }
    });
  });
  socket.on('disconnect',()=>{
    console.log(`${socket.name} disconnected.`)
    /* check in userlist*/
    let index=userList.findIndex(i=>i._id==socket.name);
    //if find, delete
    if(index != -1){
        userList.splice(index,1);
        console.log(`delete user ${socket.name} from user list.`);
        // delete
        io.emit('userLogin',userList);
    }
    else {
      //check in admin list
      index = adminList.findIndex(i=>i._id==socket.name);
      if(index != -1){
        adminList.splice(index,1);
        console.log(`delete user ${socket.name} from admin list.`);
        // delete
        io.emit('adminLogin',adminList);
    }
    }
});
});
