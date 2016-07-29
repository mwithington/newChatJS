/* LOAD THE MONGODB MODULE */
// import mongodb native drivers
var mongodb = require('mongodb');

// connect to mongodb server using "MongoClient" interface
var MongoClient = mongodb.MongoClient;

/* DEFINE THE URL WE NEED TO CONNECT TO */
// Connection URL.  This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/chat';

/* CONNECT TO THE CHAT DATABASE */
// Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server.  Error:', err);
  } else {
    // connected
    console.log('Connection established to', url);

    /* INSERT/ UPDATE DATABASE */
    var collection = db.collection('messages');

    // create some test messages
    var msg1 = {username: 'test', message: 'hello'};
    var msg2 = {username: 'foo', message: 'greetings'};
    var msg3 = {username: 'bar', message: 'salutations'};

    // insert some test messages
    collection.insert([msg1, msg2, msg3], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "messages" collection. The documents inserted with "_id" are:', result.length, result);
      }
      // close connection
      db.close();
    });

    // retrieve documents from mongodb
    collection.find({username: 'bar'}).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        console.log('Found:', result);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
      // close connection
      db.close();
    });
  }
});
