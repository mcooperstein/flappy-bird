var flappyBird = require('./flappy_bird');
var flappyPipe = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function () {
    var app = new flappyBird.FlappyBird();
    var app = new flappyPipe.FlappyPipe();
    app.run();
});
