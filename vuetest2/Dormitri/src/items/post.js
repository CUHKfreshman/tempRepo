// the post data structure

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define collection and schema for posts in forum
var Post = new Schema({
   createdAt: Date,
   title: String,
   text: String,
   userid: Number,
   username: String
});

module.exports = mongoose.model('Post', Post);