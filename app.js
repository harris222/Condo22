const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Node.js
// var path = require('path');
// var fileReader = require('fs');
var express = require('express');
var app = express();
var path = require('path');
var public = path.join(__dirname, 'public');

// viwed at public
app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'login.html'));
});

//app.get('/login')
app.use('/', express.static(public));

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





// Database Name
const dbName = 'myproject';
const client = new MongoClient(url, {useNewUrlParser: true});

// Use connect method to connect to the server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  insertDocuments(db, function() {
    client.close();
  });
});

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
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
