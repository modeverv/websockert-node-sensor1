var socket = io();
var messages = document.getElementById('messages');

/*
form.addEventListener('submit', function (e) {
    // websocketを使うのでフォームの送信をキャンセル
    e.preventDefault();

    // イベントを発火しデータを受け渡す
    socket.emit('chat', chat.value);
    chat.value = '';
});
*/

// サーバ側からchatイベントを待ち受ける
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

function output(d) {
    socket.emit('chat', d);
}

function deviceOrientationHandler(event) {
    output({
        beta: event.beta,
        gamma: event.ganma,
        alpha: event.alpha
    })
}

function showPosition(position) {
    output({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: Math.floor(position.coords.accuracy),
        heading: position.coords.heading,
    });
}

window.addEventListener(
    'deviceorientation',
    deviceOrientationHandler
);

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
} else {
    console.log("Geolocation is not supported by this browser.");
}
