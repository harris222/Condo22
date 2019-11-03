const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Node.js
// var path = require('path');
// var fileReader = require('fs');
var express = require('express');
var app = express();
var path = require('path');
var public = path.join(__dirname, 'public');
const bodyParser = require("body-parser");

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

// viwed at public
app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'login.html'));
});

app.post('/', function(req, res){
  console.log(req.body.username);
  console.log(req.body.password);

  // const userSchema = new mongoose.Schema({
  //   account: {
  //     username: req.body.username,
  //     password:
  // }
  //  });

  // Read Database and proceed to status
  // Or if Post fails, do nothing
  res.sendFile(path.join(public, 'friend.html'));
});

//app.get('/login')
app.use('/', express.static(public));

// after submission, go to friends

// Might need a User Too...
// ???

// Get Routes to Static and Non-Static Files



// Connection URL
const url = 'mongodb://localhost:27017';

// const port
const port = process.env.PORT || 3000;

// Connect to port
app.listen(port, () => {
  console.log("Matching web app started on port: " + port);
});






var uri = "mongodb://newUser:1@cluster0-shard-00-00-qwtwk.mongodb.net:27017,cluster0-shard-00-01-qwtwk.mongodb.net:27017,cluster0-shard-00-02-qwtwk.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
MongoClient.connect(uri, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  var collection = client.db("condo19").collection("condo19");
  var myQuery = {type : "chara"};

  //find everything
  collection.find(myQuery).toArray(function(err, docs){
    if(err) throw err;
    console.log(docs);
    console.log("Found " + docs.length + " documents.");

    for(var i in docs){
      console.log("My name is " + docs[i].name);
      for(var j in docs[i].friendnames){
        var frname = docs[i].friendnames[j];
        collection.findOne({"name": frname}, function(err, friend){
          if(err) throw err;
          console.log("My friend " + friend.name + " is " + friend.activity + " " + friend.specific);
        });
      }
    }
  client.close();
  });
});


// // Connection URL
// var url = 'mongodb://localhost:27017/myproject';
//
// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   var collection = db.collection("documents");
//   var myQuery = {type : "chara"};
//
//   //delete everything
//   // collection.deleteMany(myQuery, function(err, obj){
//   //   if (err) throw err;
//   //   console.log(obj.result.n + " document(s) deleted");
//   //   db.close();
//   // });
//
//   //find everything
//   collection.find(myQuery).toArray(function(err, docs){
//     if(err) throw err;
//     console.log(docs);
//     console.log("Found " + docs.length + " documents.");
//     for(var i in docs){
//       console.log("My name is " + docs[i].name);
//       for(var j in docs[i].friendnames){
//         var frname = docs[i].friendnames[j];
//         var frq = {name: frname};
//         collection.findOne(frq, function(err, friend){
//           if(err) throw err;
//           console.log("My friend " + friend.name + " is " + friend.activity + " " + friend.specific);
//         });
//       }
//     }
//     db.close();
//   });
// });

//add documents to server
var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

//get all documents from server
var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({'a' : 2}).toArray(function(err, docs) {
    //assert.equal(err, null);
    console.log(err);
    console.log("Found the following records");
    console.log(docs);
    for(var each in docs){
      console.log(docs[each].a);
    }
    callback(docs);
  });
}

//update a document
var updateDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ a : 2 }
    , { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });
}
