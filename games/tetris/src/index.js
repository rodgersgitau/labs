// Query Selectors
const guide = document.querySelector("#guide");
const canvas = document.querySelector("#board");
const btnMute = document.querySelector("#btn-mute");
const btnStart = document.querySelector("#btn-start");
const btnReset = document.querySelector("#btn-reset");
const btnGuide = document.querySelector("#btn-guide");
const alertElement = document.querySelector("#alert");
const scoreElement = document.querySelector("#total-score");
const alertContent = document.querySelector("#alert-content");
const bestScoreElement = document.querySelector("#best-score");

const bgTrack = document.querySelector("#soundtrack");
const endTrack = document.querySelector("#game-over");
const clearTrack = document.querySelector("#removetrack");

const showGuide = guide.classList.contains("hidden");

// Hide | Show Controls
const toggleControls = () => {
  guide.classList.toggle("hidden");

  if (showGuide === true) {
    btnGuide.innerHTML = "Guide [Q]";
    btnGuide.classList.remove("!text-kelp");
    btnGuide.classList.remove("!bg-sprout-800");
    // btnStart.classList.remove("hidden");
    btnReset.classList.remove("hidden");
  } else {
    // btnStart.classList.add("hidden");
    btnReset.classList.add("hidden");
    btnGuide.classList.add("!text-kelp");
    btnGuide.classList.add("!bg-sprout-800");
    btnGuide.innerHTML = "Guide [Q]";
  }
};

// Button Handlers
btnGuide.addEventListener("click", () => {
  return toggleControls();
});

btnStart.addEventListener("click", () => {
  playAudio(bgTrack);
  return play();
});

btnReset.addEventListener("click", () => {
  return reset();
});

btnMute.addEventListener("click", () => {
  return muteAudio(bgTrack);
});

// --------------------------------------
// ------------- Game Logic -------------
// --------------------------------------
const ctx = canvas.getContext("2d");

const VACANT = "#E0E9D1";
const SQ = (squareSize = 20);
const ROW = canvas.height / SQ;
const COL = (COLUMN = canvas.width / SQ);
const PIECES = [
  [Z, "#334155"],
  [S, "#10b981"],
  [T, "#eab308"],
  [O, "#0ea5e9"],
  [L, "#ec4899"],
  [I, "#d946ef"],
  [J, "#f97316"],
];

// Game variables
let score = 0;
let board = [];
let piece = null;
let delta = null;
let bestScore = 0;
let gameOver = false;
const maxScore = 99999;
let dropStart = Date.now();

for (r = 0; r < ROW; r++) {
  board[r] = [];
  for (c = 0; c < COL; c++) {
    board[r][c] = VACANT;
  }
}

// draw square method
function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

  ctx.strokeStyle = "#303A21";
  ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

// draw the board
function drawBoard() {
  for (r = 0; r < ROW; r++) {
    for (c = 0; c < COL; c++) {
      drawSquare(c, r, board[r][c]);
    }
  }
}

function randomPiece() {
  let r = (randomN = Math.floor(Math.random() * PIECES.length)); // 0 -> 6
  return new Piece(PIECES[r][0], PIECES[r][1]);
}

drawBoard();

class Piece {
  constructor(tetromino, color) {
    this.color = color;
    this.tetrominoN = 0; // we start from the first pattern
    this.tetromino = tetromino;
    this.activeTetromino = this.tetromino[this.tetrominoN];

    // we need to control the pieces
    this.x = 3;
    this.y = -2;
    this.draw();
  }
  draw() {
    this.fill(this.color);
  }
  unDraw() {
    this.fill(VACANT);
  }
  collision(x, y, piece) {
    for (let r = 0; r < piece.length; r++) {
      for (let c = 0; c < piece.length; c++) {
        // if the square is empty, we skip it
        if (!piece[r][c]) {
          continue;
        }
        // coordinates of the piece after movement
        let newX = this.x + c + x;
        let newY = this.y + r + y;

        // conditions
        if (newX < 0 || newX >= COL || newY >= ROW) {
          return true;
        }
        // skip newY < 0; board[-1] will crush our game
        if (newY < 0) {
          continue;
        }
        // check if there is a locked piece alrady in place
        if (board && board[newY][newX] != VACANT) {
          return true;
        }
      }
    }
    return false;
  }
  fill(color) {
    for (let r = 0; r < this.activeTetromino.length; r++) {
      for (let c = 0; c < this.activeTetromino.length; c++) {
        // we draw only occupied squares
        if (this.activeTetromino[r][c]) {
          drawSquare(this.x + c, this.y + r, color);
        }
      }
    }
  }
  lock() {
    for (let r = 0; r < this.activeTetromino.length; r++) {
      for (let c = 0; c < this.activeTetromino.length; c++) {
        // we skip the vacant squares
        if (!this.activeTetromino[r][c]) {
          continue;
        }
        // pieces to lock on top = game over
        if (this.y + r < 0) {
          // stop request animation frame
          gameOver = true;
          showAlert(`Game Over!! Your score : ${score}`);
          break;
        }
        // we lock the piece
        board[this.y + r][this.x + c] = this.color;
      }

      // remove full rows
      for (let r = 0; r < ROW; r++) {
        let isRowFull = true;
        for (let c = 0; c < COL; c++) {
          isRowFull = isRowFull && board[r][c] != VACANT;
        }
        if (isRowFull) {
          // if the row is full
          // we move down all the rows above it
          for (let y = r; y > 1; y--) {
            for (c = 0; c < COL; c++) {
              board[y][c] = board[y - 1][c];
            }
          }
          // the top row board[0][..] has no row above it
          for (let c = 0; c < COL; c++) {
            board[0][c] = VACANT;
          }
          // increment the score
          score += 10;
        }
      }
    }
    drawBoard();
    updateStorage();
  }
  rotate() {
    let nextPattern =
      this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
    let kick = 0;

    if (this.collision(0, 0, nextPattern)) {
      if (this.x > COL / 2) {
        // it's the right wall
        kick = -1; // we need to move the piece to the left
      } else {
        // it's the left wall
        kick = 1; // we need to move the piece to the right
      }
    }

    if (!this.collision(kick, 0, nextPattern)) {
      this.unDraw();
      this.x += kick;
      this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length; // (0+1)%4 => 1
      this.activeTetromino = this.tetromino[this.tetrominoN];
      this.draw();
    }
  }
  moveDown() {
    if (!this.collision(0, 1, this.activeTetromino)) {
      this.unDraw();
      this.y++;
      this.draw();
    } else {
      // we lock the piece and generate a new one
      this.lock();
      piece = randomPiece();
    }
  }
  moveLeft() {
    if (!this.collision(-1, 0, this.activeTetromino)) {
      this.unDraw();
      this.x--;
      this.draw();
    }
  }
  moveRight() {
    if (!this.collision(1, 0, this.activeTetromino)) {
      this.unDraw();
      this.x++;
      this.draw();
    }
  }
}

piece = randomPiece(board);

function play() {
  updateStorage();
  let now = Date.now();
  delta = now - dropStart;

  if (delta > 500) {
    piece.moveDown();
    dropStart = Date.now();
  }

  if (!gameOver) {
    alertElement.classList.add("hidden");
    alertElement.classList.remove("flex");
    requestAnimationFrame(play);
  } else {
    muteAudio(bgTrack); // stop soundtrack
    playAudio(endTrack); // play end sound
    setTimeout(() => {
      // remove audio
      document
        .querySelectorAll("audio")
        .forEach((audioTrack) => stopAudio(audioTrack));
    }, 1000);
  }
}

function reset() {
  playAudio(clearTrack);
  return window.location.reload();
}

function showAlert(alert) {
  alertElement.classList.add("flex");
  alertElement.classList.remove("hidden");
  alertContent.innerHTML = alert;
  setTimeout(() => {
    alertElement.classList.remove("flex");
    alertElement.classList.add("hidden");
    reset();
  }, 3000);
}

// --------------------------------------
// ------------- Audio ------------------
// --------------------------------------
function muteAudio(track) {
  if (!track) return;
  try {
    if ((track.muted = true)) {
      track.volume = 0;
      track.muted = true;
      btnMute.innerHTML = "Unmute [M]";
    } else {
      track.volume = 0.5;
      track.muted = false;
      btnMute.innerHTML = "Mute [M]";
    }
  } catch (error) {
    console.log(error);
  }
}

function playAudio(track) {
  if (!track) return;
  try {
    track.preload = "auto";
    track.volume = 0.5;
    track.play();
  } catch (error) {
    console.log(error);
  }
}

function stopAudio(track) {
  if (!track) return;
  try {
    document.body.removeChild(track);
  } catch (error) {
    console.log(error);
  }
}

// --------------------------------------
// -------- LocalStorage ----------------
// --------------------------------------

function updateStorage() {
  const supported = window.localStorage;
  if (supported) {
    const hasValue = window.localStorage.getItem("best-score");
    if (hasValue) {
      bestScore = localStorage.getItem("best-score");
    } else {
      localStorage.setItem("best-score", bestScore);
    }
  }
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("best-score", bestScore);
  }

  if (score === maxScore) {
    gameOver = true;
    showAlert(`Maximum Score!! New best : ${score}`);
  }
  scoreElement.innerHTML = score;
  bestScoreElement.innerHTML = bestScore;
}

// --------------------------------------
// ------------- Controls ---------------
// --------------------------------------
document.addEventListener("keydown", (event) => {
  switch (`${event.code}`) {
    case "KeyQ":
      return toggleControls();
    case "KeyP":
      playAudio(bgTrack);
      return play();
    case "KeyR":
      return reset();
    case "KeyM":
      return muteAudio(bgTrack);
    case "ArrowLeft":
      piece.moveLeft();
      dropStart = Date.now();
      break;
    case "ArrowRight":
      piece.moveRight();
      dropStart = Date.now();
    case "ArrowDown":
      piece.moveDown();
      break;
    case "Space":
      piece.rotate();
      dropStart = Date.now();
      break;
    default:
      console.log(`You've pressed ${event.code}`);
      break;
  }
});

window.addEventListener("load", () => {
  updateStorage();
  // --------------------------------------
  // ------------- Particles --------------
  // --------------------------------------
  particlesJS("particles", {
    particles: {
      number: {
        value: 355,
        density: {
          enable: true,
          value_area: 789.1476416322727,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.48927153781200905,
        random: false,
        anim: {
          enable: true,
          speed: 0.2,
          opacity_min: 0,
          sync: false,
        },
      },
      size: {
        value: 2,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0,
          sync: false,
        },
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 600 },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "bubble",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 83.91608391608392,
          size: 1,
          duration: 3,
          opacity: 1,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });
});
