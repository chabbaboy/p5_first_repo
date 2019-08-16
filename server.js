const express = require('express');
const socket = require('socket.io');

const app = express();

const server = app.listen(3000, '0.0.0.0');
app.use(express.static('public'));
console.log('ev servera')

const io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new xonnewction' + socket.id)

    socket.on('data',changeMousePosition);

    function changeMousePosition(data){
      //  console.log(data)
        socket.broadcast.emit('mousePosition',data);
    }
    
}


