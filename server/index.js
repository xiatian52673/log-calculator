const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/../client/dist/')));

const logData = [];

io.on('connection', socket => {
  console.log('A user connected.');
  socket.on('disconnect', () => console.log('A user disconnected'));
  socket.on('evaluation', expression => {
    if (expression) logData.unshift(expression);
    if (logData.length > 10) logData.pop();
    io.emit('evaluation', logData);
  })
});

http.listen(3000, () => console.log('listening on port 3000'));
