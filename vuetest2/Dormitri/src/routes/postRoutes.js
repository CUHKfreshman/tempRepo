// photo routes and its used modules and APIs

const express = require('express');
const mongodb = require('mongodb');
const postRoutes = express.Router();
const Post = require('../items/post.js');
//get posts
postRoutes.get('/all', async (req,res) => {
    const posts = await loadMongoDB();
    res.send(await posts.find({}).sort({createdAt: -1}).toArray());
});

//get one specific post
postRoutes.get('/postid', async (req,res) => {
    const posts = await loadMongoDB();
    await posts.findOne({"_id": new mongodb.ObjectId(req.query.id)}, function(err, result) {
        if (err) throw err;
        res.send(result);
    })
});

//insert new posts
postRoutes.post('/add', async (req,res) => {
    const posts = await loadMongoDB();
    var newPost = new Post(req.body);
    await posts.insertOne(newPost);
    console.log(newPost);
    res.status(201).send();
});
//edit posts
postRoutes.post('/:id', async (req,res) => {
    const posts = await loadMongoDB();
    //console.log('here');
    //console.log(req)
    console.log("attempted to edit post")
    console.log(req.body)
    await posts.updateOne({"_id": new mongodb.ObjectId(req.params.id)}, {$set:req.body});
    res.status(201).send();
});
//delete posts
postRoutes.delete('/:id', async (req,res) => {
    const posts = await loadMongoDB();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send();
});
//search posts
postRoutes.get('/:text', async (req,res) =>{
    const posts = await loadMongoDB();//find posts whose contents OR title includes the required text
    res.send(await posts.find({$or:[{"text": {$regex: req.params.text} }, {"title": {$regex: req.params.text}}]}).toArray());
  })
//load database
async function loadMongoDB() {
    const client = await mongodb.MongoClient.connect('mongodb://127.0.0.1:27017/', {
        useNewUrlParser: true
    })
    return client.db('mydb').collection('posts');
};

module.exports = postRoutes;