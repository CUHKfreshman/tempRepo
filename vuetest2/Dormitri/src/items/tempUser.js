// the temp user data structure

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define collection and schema for temp user for register
var tempUser = new Schema({
   email: String,
   id: String,
   password: String,
   username: String,
   code: String,
});

module.exports = mongoose.model('tempUser', tempUser);
