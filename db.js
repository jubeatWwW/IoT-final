const cors = require('cors');
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost:27017/test';


app.use(cors());

app.get('/', function (req, res) {
    MongoClient.connect(mongoUrl, (err, db) => {
        db.collection('coap').findOne({} , (err, result) => {
            console.log(result);
            res.send(result);
        });
    });
});

app.listen(5001, function () {
    console.log('listening on port 5001!');
});
