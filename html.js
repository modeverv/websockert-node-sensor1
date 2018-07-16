var socket = io();
var messages = document.getElementById('messages');

socket.on('chat', function (data) {
    writeData(data);
});

function writeData(data) {
    for (key in data) {
        var elem = document.getElementById(key);
        if (elem) {
            elem.innerHTML = data[key];
        }
    }
}

function output(data) {
    socket.emit('chat', data);
}

function deviceOrientationHandler(event) {
    output({
        beta: event.beta,
        gamma: event.gamma,
        alpha: event.alpha
    })
}

function positionHandler(position) {
    output({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        altitude: position.coords.altitude,
        accuracy: Math.floor(position.coords.accuracy),
        heading: position.coords.heading,
    });
}

