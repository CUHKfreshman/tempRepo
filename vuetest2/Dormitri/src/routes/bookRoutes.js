// book routes and its used modules and APIs

const express = require('express');
const mongodb = require('mongodb');
const bookingRoutes = express.Router();
const Facility = require('../items/facility');
//get facility status
bookingRoutes.get('/', async(req, res)=>{
    const fDatabase = await loadMongoDB();
    //console.log('attempt to check faciility');
    //console.log(req);
    var query = new Facility(req.body);
    //console.log('lfag')
    //console.log(await fDatabase.find(query).sort({"fName": 1}).toArray())
    //console.log(await fDatabase.find(query).toArray())
    //console.log(await fDatabase.find(req.body).toArray())
    res.send(await fDatabase.find(req.body).sort({"fName": 1}).toArray());
})
// get list of booking records
bookingRoutes.get('/list', async(req, res)=>{
    const fDatabase = await loadMongoDB();
    //console.log('attempt to check list');
    //console.log(req.query.hookID);
    var query = new Facility(req.body);
    //console.log('lfag')
    //console.log(await fDatabase.find(query).sort({"fName": 1}).toArray())
    //console.log(await fDatabase.find(query).toArray())
    //console.log(await fDatabase.find(req.body).toArray())
    res.send(await fDatabase.find({"hookID":req.query.hookID}).sort({"fName": 1}).toArray());
})

// add booking
bookingRoutes.post('/add', async (req,res) => {
    const fDatabase = await loadMongoDB();
    console.log('attempt to insert faciility');
    console.log(req.body);
    var query = new Facility(req.body);
    console.log(query)
    fDatabase.insertOne(query);
    res.status(201).send();


    
});
//delete reservation
bookingRoutes.delete('/', async (req,res) => {
    const fDatabase = await loadMongoDB();
    console.log('attempt to delete faciility');
    console.log(req.body);
    await fDatabase.deleteOne(req.body);
    res.status(200).send();
})

//load database
async function loadMongoDB() {
    const client = await mongodb.MongoClient.connect('mongodb://127.0.0.1:27017/', {
        useNewUrlParser: true
    })
    return client.db('mydb').collection('bookings');
};

module.exports = bookingRoutes;