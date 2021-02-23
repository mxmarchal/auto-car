const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const dotenv = require('dotenv').config()
const payload = require('./payload');
const cmd = require('./cmd');
const world = require('./world');

function worldDebug(worldMap) {
    for (let y = 0; y < worldMap.length; y++) {
        console.log(worldMap[y].toString());
    }
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('CMD', (msg) => {
        console.log(cmd.execute(msg, socket));
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

http.listen(3000, () => {
    let test = world.generate(Number(process.env.WORLD_SIZE_X), Number(process.env.WORLD_SIZE_Y));
    worldDebug(test);
    console.log('listening on *:3000');
});