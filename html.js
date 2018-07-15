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

function showPosition(position) {
    output({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        altitude: position.coords.altitude,
        accuracy: Math.floor(position.coords.accuracy),
        heading: position.coords.heading,
    });
}

window.addEventListener(
    'deviceorientation',
    deviceOrientationHandler
);

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition, function (error) {
        console.log(error);
    }, {
        "enableHighAccuracy": true,
        "timeout": 1000000,
        "maximumAge": 0,
    });
} else {
    alert("Geolocation is not supported by this browser.");
}
