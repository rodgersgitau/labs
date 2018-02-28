// game variables
var MessageBox = document.getElementById("MessageBox");
var Message = document.getElementById("Message");
var Trigger = document.getElementById("btn");
Trigger.innerHTML = " Start Game";
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleY = canvas.height - paddleHeight;
var rightPressed = false;
var leftPressed = false;
var color = random();
var brickRowCount = 5;
var brickColumnCount = 8;
var brickWidth = 60;
var brickHeight = 30;
var brickPadding = 12;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;
var game;
var msg;

var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      status: 1
    };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

// Handle KeyPresses
function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  } else if (e.keyCode == 32) {
    pauseGame();
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  } else if (e.keyCode == 32) {
    pauseGame();
  }
}

// Handle Mouse movements
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

// Random rainbow colors
function random() {
  var colorArray = [
    "#FF0000",
    "#FF7F00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#9400D3"
  ];
  var rand = Math.floor(Math.random() * colorArray.length);
  color = colorArray[rand];

  return color;
}

// Draw functions
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = color;
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "20px Arial";
  ctx.fillStyle = color;
  ctx.fillText("Lives: " + lives, canvas.width - 85, 20);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;

          // Winning Message
          if (score == brickRowCount * brickColumnCount) {
            if (lives == 3) {
              score + 5;
            }
            let msg = "YOU WIN, CONGRATULATIONS!";
            endGame(msg);
          }
        }
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        let msg = "YOU LOSE, TRY AGAIN!";
        endGame(msg);
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  if (game) {
    game = requestAnimationFrame(draw);
  }
}
draw();

// Trigger Actions
Trigger.addEventListener("click", function() {
  startGame();
});

//Pause Game
canvas.addEventListener("click", function() {
  pauseGame();
});

function pauseGame() {
  game = undefined;
  MessageBox.style.display = "flex";
  Message.innerHTML = "Game Paused";
  Trigger.innerHTML = "Resume Game";
}
// Start Game
function startGame() {
  paddleX = (canvas.width - paddleWidth) / 2;
  game = requestAnimationFrame(draw);
  MessageBox.style.display = "none";
}

// End Game
function endGame(msg) {
  game = undefined;
  MessageBox.style.display = "flex";
  Message.innerHTML = ` ${msg}<div style="margin-top:10vh;text-align:center;padding: 10px;
  background: #420040; color:#fff;">Your Score: ${score}</div> `;
  Trigger.style.display = "None";
  setTimeout(function() {
    document.location.reload();
  }, 3500);
}
