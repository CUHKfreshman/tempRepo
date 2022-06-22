//user routes and its used modules and APIs

const express = require('express');
const mongodb = require('mongodb');
const userRoutes = express.Router();
const User = require('../items/user.js');
const tempUser = require('../items/tempUser');
const cors = require('cors');
const { sendMail, sendPasswordMail } = require('../emails/email.js');

//add new user
userRoutes.post('/add', async (req, res) => {
  var user = new User(req.body);
  console.log(user);
  const client = await loadMongoDB();
  if (await client.countDocuments({ "_id": user._id }, {limit: 1}) != 0) {
    //console.log(await client.countDocuments({ "_id": user.username }, {limit: 1}))
    console.log(`user already exist with the _id: ${user._id}`);
    res.status(205).send();
  }
  else if(await client.countDocuments({ "username": user.username }, {limit: 1}) != 0){
    console.log(`user already exist with the name: ${user.username}`);
    res.status(205).send();
  }
  else {
    user.identity = "resident";
    user.userStatus = "Offline";
    const result = await client.insertOne(user);
    console.log('A user was inserted with the _id: %s', result.insertedId);
    res.status(201).send({'user': 'User added successfully'});
  }
});

//search user existence when login.
userRoutes.get('/search', async (req, res) =>{
  var user = new User(req.query);
  const client = await loadMongoDB();
  const result = await client.find({"_id": user._id, "password": user.password}).toArray();
  console.log(result);
  res.send(result);
 });

 //search user by id
userRoutes.get('/searchid', async (req, res) =>{
  const client = await loadMongoDB();
  var user = new User(req.query);
  client.findOne({"_id": user._id}, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
 });

 //get all users
 userRoutes.get('/all', async (req, res) =>{
  const client = await loadMongoDB();
  var result = await client.find({"identity": {$ne:"admin"}}).sort({"_id":1}).toArray();
  if (result) res.send(result);
 });

 //search an admin email
 userRoutes.get('/searchemail', async (req, res) =>{
  var user = new User(req.query);
  const client = await loadMongoDB();
  client.findOne({"identity": "admin"}, function(err, resp) {
    if (err) throw err;

    // no admin
    if (!resp) {
        console.log("no admin in database");
        res.send({});
    } else {
        let result = {
            "username": resp.username,
            "email": resp.email
        }
      res.send(result);
    }
  });
 });

userRoutes.post('/updatepassword', async (req, res) =>{
  var user = new User(req.body);
  const client = await loadMongoDB();
  var myquery = { _id: user._id };
  var newvalues = { $set: { password: user.password } };
  console.log(user._id);
  console.log(user.password);
  client.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res);
  });
});

userRoutes.post('/updatepasswordbyadmin', async (req, res) =>{
  var user = new User(req.body);
  const client = await loadMongoDB();
  var myquery = { _id: user._id };
  var newpassword = Math.floor(100000 + Math.random() * 900000).toString();
  var newvalues = { $set: { password: newpassword } };
  console.log(user._id);
  console.log(user.username);
  console.log(user);
  client.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res);
    sendPasswordMail(user.email, user.username, newpassword);
  });
});

userRoutes.post('/updateprofile', async (req, res) =>{
  var user = new User(req.body);
  const client = await loadMongoDB();
  console.log('update profile');
  console.log(user);
  var myquery = { "_id": user._id };
  var newvalues = { $set: { "hostel": user.hostel, "college": user.college, "room": user.room, "username":user.username } };
  client.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res);
  });
});

userRoutes.post('/updateall', async (req, res) =>{
  var user = new User(req.body);
  const client = await loadMongoDB();
  console.log('update profile');
  console.log(user);
  var myquery = { "_id": user._id };
  console.log(req.body);
  delete req.body._id;
  var newvalues = { $set: req.body };
  console.log('set')
  client.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res);
  });
});

userRoutes.post('/updatephoto', async (req, res) =>{
  var user = new User(req.body);
  const client = await loadMongoDB();
  console.log('update profile photo');
  console.log(user);
  var myquery = { "_id": user._id };
  var newvalues = { $set: { "img": user.img } };
  client.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res);
  });
  res.status(201).send();
});

userRoutes.post('/changeOnlineStatus', async (req,res)=>{
  var user = new User(req.body);
  const client = await loadMongoDB();
  var myquery = { "_id": user._id };
  var newvalues = { $set: { "userStatus": "Online" } };
  console.log(`${user} has been online.`);
  client.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res);
  });
})
userRoutes.post('/changeOfflineStatus', async (req,res)=>{
  var user = new User(req.body);
  const client = await loadMongoDB();
  var myquery = { "username": user.username };
  var newvalues = { $set: { "userStatus": "Offline" } };
  console.log(`${user} has been offline.`);
  client.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res);
  });
})
async function loadMongoDB() {
  const client = await mongodb.MongoClient.connect('mongodb://127.0.0.1:27017/');
  return client.db('mydb').collection('users');
};

//add new temp user
userRoutes.post('/addtemp', async (req, res) => {
  var user = new tempUser(req.body);
  var code = Math.floor(100000 + Math.random() * 900000).toString();
  user.code = code;
  console.log(user);
  const client = await loadTempMongoDB();
  const result = await client.insertOne(user);
  sendMail(user.email, user.username, code);
  console.log('A temp user was inserted with the _id: %s', result.insertedId);
  res.status(201).send({'user': 'Temp User added successfully'});
});

userRoutes.post('/checktemp', async (req, res) => {
  var user = new tempUser(req.body);
  console.log("check temp user now!!!");
  console.log(user);
  const client = await loadTempMongoDB();
  let toCheck = { "id": user.id, "code": user.code, "email": user.email, "username": user.username, "password": user.password};
  if (await client.countDocuments(toCheck, {limit: 1}) > 0) {
    //console.log(await client.countDocuments({ "_id": user.username }, {limit: 1}))
    console.log(`temp user exist with code: ${user.code}`);
    await client.deleteMany({"id": user.id}, function (err, result) {
      if (err) throw err;
      console.log(result.deletedCount + " temp user deleted");
    })
    res.status(201).send();
  }
  else res.status(205).send();
});

async function loadTempMongoDB() {
  const client = await mongodb.MongoClient.connect('mongodb://127.0.0.1:27017/');
  return client.db('mydb').collection('tempusers');
};

module.exports = userRoutes;
