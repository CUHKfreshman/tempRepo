// book routes and its used modules and APIs

const express = require('express');
const mongodb = require('mongodb');
const commentRoutes = express.Router();
const Comment = require('../items/comment.js');
// get comment by post id
commentRoutes.get('/postid', async (req,res) => {
    const comments = await loadMongoDB();
    console.log(req.query.id + " is id")
    await comments.find({"postid": req.query.id}).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
    })
});
// delete comment
commentRoutes.delete('/:id', async (req,res) => {
    const comments = await loadMongoDB();
    await comments.deleteMany({"postid": req.params.id}, function (err, result) {
        if (err) throw err;
        console.log(result.deletedCount + " comments deleted");
    })
    res.status(200).send();
});

//insert new posts
commentRoutes.post('/add', async (req,res) => {
    const comments = await loadMongoDB();
    var newComment = new Comment(req.body);
    console.log(newComment);
    await comments.insertOne(newComment);
    res.status(201).send();
});

//load database
async function loadMongoDB() {
    const client = await mongodb.MongoClient.connect('mongodb://127.0.0.1:27017/', {
        useNewUrlParser: true
    })
    return client.db('mydb').collection('comments');
};

module.exports = commentRoutes;