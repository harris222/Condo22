var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var uri = "mongodb://newUser:1@cluster0-shard-00-00-qwtwk.mongodb.net:27017,cluster0-shard-00-01-qwtwk.mongodb.net:27017,cluster0-shard-00-02-qwtwk.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";


// //for logging in
// exports.loginCheck = function(user, pass, found){
//   MongoClient.connect(uri, function(err, client) {
//     exports.cln = client;
//     assert.equal(null, err);
//     console.log("Connected successfully to server");
//
//     var collection = client.db("condo19").collection("condo19");
//     var myq = {username: user, password: pass};
//
//     return new Promise(function(resolve, reject) {
//        // Do async job
//        collection.findOne(myq, function(err, result){
//          if(err) reject(err);
//          else resolve(result);
//        });
//     });
//
//
//   });
// }

//check if login credentials are valid
async function loginCheck(user, pass) {
    let client = await MongoClient.connect(uri);
    try {
        let collection = client.db("condo19").collection("condo19");
        let userCount = (await collection.find(
            {
                username: user,
                password: pass
            }).limit(1).count());
        return userCount > 0;
    } finally {
        //client.close();
    }
}
exports.loginCheck = loginCheck;

exports.changeSpecificActivity = function(cname, cactivity, cspecific){
  MongoClient.connect(uri, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    var collection = client.db("condo19").collection("condo19");

    collection.findOneAndUpdate(
      { name : cname },
      { $set: { activity : cactivity,  specific: cspecific} }
    );

    //client.close();
  });
};

exports.addFriend = function(cname, fname){
  MongoClient.connect(uri, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    var collection = client.db("condo19").collection("condo19");

    collection.findOneAndUpdate(
      { name : cname },
      { $push: { friendnames: fname} }
    );

    collection.findOne({name: cname}, function(err, chara){
      var permis = chara.permissions;
      permis[fname] = {'sleeping': true, 'studying': true, 'creating': true, 'secret': true, 'out': true};

      collection.findOneAndUpdate(
        { name : cname },
        { $set: { "permissions": permis} }
      );
    });

  });
};

//does not work, will write in actual file
var activ, spec;
exports.getFriendInfo = function(cname, fname){
  MongoClient.connect(uri, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    var collection = client.db("condo19").collection("condo19");
    var frq = {name: fname};

    collection.findOne(frq, function(err, friend){
      activ = friend["activity"];
      spec = friend["specific"];
      var permis = friend["permissions"];
      var allow = permis[cname][activ];
      if(!allow){
        spec = "secret";
        activ = "secret";
      }
    });

    //client.close();
  });
}

exports.activ = activ;
exports.spec = spec;
//update permissions


//DON'T FIX UNLESS BORED
//check if username exists
//for adding a character
exports.addChara = function(cname, clogo, user, pass){
  MongoClient.connect(uri, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    var collection = client.db("condo19").collection("condo19");
    collection.insert({
      name : cname,
      activity: "sleeping",
      specific: "sleeping",
      logo: "clogo",
      type: "chara",
      username: username,
      password: password,
      friendnames: [],
      permissions: {}
    }, function(err, result){
      assert.equal(err, null);
      console.log("New chara created");
    });
    //client.close();
  });
}
