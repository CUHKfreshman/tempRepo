// the user data structure

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define collection and schema for user database
var User = new Schema({
   _id: Number,
   email: String,
   identity: String,
   password: String,
   username: String,
   college: String,
   hostel: String,
   userStatus: { type: String, default: "Offline" },
   room: String,
   img: String,
});

module.exports = mongoose.model('User', User);

