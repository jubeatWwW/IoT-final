const PORT = 8080;

const coap = require('coap');
const net = require('net');
const server = net.createServer();

server.on('connection', (sock)=> {
    console.log('client connected');

    sock.on('data', (data)=>{
        let stat = data.toString('utf8');
        console.log('data', stat);
        let req = coap.request('coap://localhost/');
        req.write(stat);
        req.end();
    });

    sock.on('close', ()=>{
        console.log('disconnected');
    });
});

server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});
