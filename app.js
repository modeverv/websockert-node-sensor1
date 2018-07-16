/** config */
var PORT = 8999;

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/read.html');
});
app.get('/read.html', (req, res) => {
    res.sendFile(__dirname + '/read.html');
});
app.get('/send.html', (req, res) => {
    res.sendFile(__dirname + '/send.html');
});
app.get('/html.js', (req, res) => {
    res.sendFile(__dirname + '/html.js');
});

io.on('connection', (socket) => {
    socket.on('chat', (msg) => {
        console.log(msg);
        io.emit('chat', msg);
    });
});

server.on('listening', () => {
    console.log('listening on ' + PORT);
})

server.listen(PORT);
