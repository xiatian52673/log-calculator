var express = require('express'),
    sio = require('socket.io'),
    bodyParser = require('body-parser');

const path = require('path');

var app =express()
app.use(bodyParser());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/../client/dist/')));


var server = app.listen(3000);
var io=sio.listen(server);

io.sockets.on('connection',function(socket){
    socket.on('join',(name)=>{
        socket.nickname=name;
        console.log("joinkname:"+name)
        // console.log(socket.broadcast.RequestHeaders);
        socket.broadcast.emit('announcement',name+'join the chat');
        // socket.emit('announcement',name+'join the chat');
    })
    console.log("someone connected")
})