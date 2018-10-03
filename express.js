var express = require('express')
var app = express()

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

let db = null;
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'phucam';

MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    db = client.db(dbName);
});

const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('topic');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}

app.get('/', function (req, res) {
    res.send('Hello World')

})

app.get('/data', function (req, res) {
    const collection = db.collection('topic');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        res.json(docs)
    });
})

app.listen(3000, () => {
    console.log("Server is running")
})
