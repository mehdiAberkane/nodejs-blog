const MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/blog", function(err, db) {
    if(!err) { console.log("We are connected");  }

    db.createCollection('test', function(err, collection) {});
});