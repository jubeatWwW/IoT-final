const coap = require('coap');
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost:27017/test';
let assert = require('assert');

let server = coap.createServer();

server.on('request', (req, res) => {
    
    req.on('data', (data)=> {
        let stat = parseInt(data.toString('utf8'));
        console.log('received:', stat);

        MongoClient.connect(mongoUrl, (err, db) => {
            db.collection('coap').findOne({} , (err, result) => {
                console.log(result);
                if(result == null){
                    db.collection('coap').insertOne({
                        status: stat
                    }, (err, res)=> {
                        console.log('insert');
                        db.close();
                    });
                } else {
                    db.collection('coap').updateOne(result, {
                        status: stat
                    }, (err, res)=> {
                        console.log('update');
                        db.close();
                    });
                }
            });
        });
    });

    res.on('finish', (err) => {
        console.log('response finish');
    });
});

server.listen(()=>{
    console.log('server start');
});
