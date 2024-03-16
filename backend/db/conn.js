// THIS IS CONNECTION TO THE MONGODB 
const mongoose = require("mongoose");


// we hided this link in config.env
const DB =process.env.DATABASE


// MAIN CONNECTION TO THE MONGODB
mongoose
  .connect(DB)
  .then(() => {
    console.log("connection successful to the mongodb database.... :)");
  })
  .catch(() => {
    console.log("not connected to the mongog db database :(");
  });




//   let MongoClient = require('mongodb').MongoClient;
// MongoClient.connect(DB, function(err, client){
//   if(err) throw err;
//   let db = client.db('test');
//   db.collection('devices').find().toArray(function(err, result){
//     if(err) throw err;
//     console.log(result);
//     client.close();
//     });
//  });
