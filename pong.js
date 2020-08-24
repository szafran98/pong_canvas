const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

const player = {
    x: 0,
    y: canvas.height / 2 - 100 / 2,
    width: 10,
    height: 100,
    color: 'WHITE' 
}

const computer = {
    x: canvas.width - 10,
    y: canvas.height / 2 - 100 / 2,
    width: 10,
    height: 100,
    color: 'WHITE' 
}

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    velX: 5,
    velY: 5,
    color: 'WHITE' 
}

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false)
    ctx.closePath();
    ctx.fill();
}

canvas.addEventListener('mousemove', movePlayer);

function movePlayer(e) {
    let rect = canvas.getBoundingClientRect();

    player.y = e.clientY - rect.top - player.height / 2;
}

function ballOut() {
    if (ball.x < 0 || ball.x > canvas.width) {
        setTimeout(() => {
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
        }, 1000);
    }
}

function collision(ball, player) {
    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;

    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;

    return ball.right > player.left && ball.bottom > player.top && ball.left < player.right && ball.top < player.bottom
}

function render() {
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    drawRect(0, 0, 600, 400, 'BLACK');
    
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);

    drawBall(ball.x, ball.y, ball.radius, ball.color);
}

function update() {
    ball.x += ball.velX;
    ball.y += ball.velY;

    computer.y += (ball.y - (computer.y + computer.height / 2)); 

    if (ball.y + ball.radius > canvas.height | ball.y - ball.radius < 0) {
        ball.velY = -ball.velY;
    }

    let user = (ball.x < canvas.width / 2) ? player : computer;

    if (collision(ball, user)) {
        ball.velX = - ball.velX;
    }

    ballOut();
    
}

function game() {
    update();
    render();
}

setInterval(game, 1000/25);