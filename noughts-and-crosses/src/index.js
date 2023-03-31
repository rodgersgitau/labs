// --------------------------------------
// -------- Query Selectors -------------
// --------------------------------------
const canvas = document.querySelector("#board");
const tracks = document.querySelectorAll("audio");
const alertElement = document.querySelector("#alert");
const btnSound = document.querySelector("#btn-sound");

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
  // scoreElement.innerHTML = score;
  // bestScoreElement.innerHTML = bestScore;
}

// --------------------------------------
// ------------- Game Logic -------------
// --------------------------------------
const ctx = canvas.getContext("2d");
const VACANT = "#E0E9D1";
const NOUGHT = "#f1be32";
const CROSS = "#f472b6";
const canvasSize = 500;
const sectionSize = canvasSize / 3;
canvas.width = canvasSize;
canvas.height = canvasSize;
ctx.translate(0.5, 0.5);

let score = 0;
let board = [];
let player = 1;
let audio = false;
let bestScore = 0;
let gameOver = false;
const maxScore = 99999;

// draw lines
function drawLines(lineWidth, strokeStyle) {
  const lineStart = 4;
  const lineLenght = canvasSize - 5;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();

  // Horizontal lines
  for (var y = 1; y <= 2; y++) {
    ctx.moveTo(lineStart, y * sectionSize);
    ctx.lineTo(lineLenght, y * sectionSize);
  }

  // Vertical lines
  for (var x = 1; x <= 2; x++) {
    ctx.moveTo(x * sectionSize, lineStart);
    ctx.lineTo(x * sectionSize, lineLenght);
  }

  ctx.stroke();
}

//  draw the board
function drawBoard() {
  for (var x = 0; x < 3; x++) {
    board.push([]);

    for (var y = 0; y < 3; y++) {
      board[x].push("");
    }
  }
  return drawLines(10, VACANT);
}

// draw noughts
function drawO(xCordinate, yCordinate) {
  var halfSectionSize = 0.5 * sectionSize;
  var centerX = xCordinate + halfSectionSize;
  var centerY = yCordinate + halfSectionSize;
  var radius = (sectionSize - 100) / 2;
  var startAngle = 0 * Math.PI;
  var endAngle = 2 * Math.PI;

  ctx.lineWidth = 10;
  ctx.strokeStyle = NOUGHT;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.stroke();
}

// draw crosses
function drawX(xCordinate, yCordinate) {
  ctx.strokeStyle = CROSS;

  ctx.beginPath();

  var offset = 50;
  ctx.moveTo(xCordinate + offset, yCordinate + offset);
  ctx.lineTo(
    xCordinate + sectionSize - offset,
    yCordinate + sectionSize - offset
  );

  ctx.moveTo(xCordinate + offset, yCordinate + sectionSize - offset);
  ctx.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);

  ctx.stroke();
}

// add  piece
function addPlayingPiece(mouse) {
  let xCordinate;
  let yCordinate;

  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      xCordinate = x * sectionSize;
      yCordinate = y * sectionSize;

      if (
        mouse.x >= xCordinate &&
        mouse.x <= xCordinate + sectionSize &&
        mouse.y >= yCordinate &&
        mouse.y <= yCordinate + sectionSize
      ) {
        clearPlayingArea(xCordinate, yCordinate);

        if (player === 1) {
          drawX(xCordinate, yCordinate);
        } else {
          drawO(xCordinate, yCordinate);
        }
      }
    }
  }
}

// get mouse position
function getMousePosition(event) {
  var rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

// clear the board
function clearPlayingArea(xCordinate, yCordinate) {
  ctx.fillStyle = "transparent";
  ctx.fillRect(xCordinate, yCordinate, sectionSize, sectionSize);
}

canvas.addEventListener("mouseup", function (event) {
  if (player === 1) {
    player = 2;
  } else {
    player = 1;
  }
  let canvasMousePosition = getMousePosition(event);
  addPlayingPiece(canvasMousePosition);
});

// start the game
function play() {
  hideAlert();
  drawBoard();

  if (!gameOver) {
    hideAlert();
    requestAnimationFrame(play);
  }
}

// reset the game
function reset() {
  return window.location.reload();
}

// --------------------------------------
// ------------- Audio ------------------
// --------------------------------------
function toggleAudio() {
  if (!tracks) return;
  btnSound.setAttribute("disabled", true);

  try {
    tracks.forEach((track) => {
      if (audio) {
        track.volume = 0;
        track.muted = true;
      } else {
        track.volume = 0.5;
        track.muted = false;
      }
    });
  } catch (error) {
    console.log(error);
  }
  return btnSound.removeAttribute("disabled");
}

function updateSoundElement() {
  const soundOnIcon = document.querySelector("#sound-on");
  const soundOffIcon = document.querySelector("#sound-off");

  if (audio) {
    audio = false;
    soundOffIcon.classList.add("hidden");
    soundOnIcon.classList.remove("hidden");
    return;
  }
  audio = true;
  soundOnIcon.classList.add("hidden");
  soundOffIcon.classList.remove("hidden");
  return;
}

// --------------------------------------
// ------------- Controls ---------------
// --------------------------------------
btnSound.addEventListener("click", () => {
  return updateSoundElement();
});

alertElement.querySelector("#alert-content").addEventListener("click", () => {
  return play();
});

document.addEventListener("keydown", (event) => {
  switch (`${event.code}`) {
    case "KeyQ":
      return toggleControls();
    case "KeyP":
      return play();
    case "KeyR":
      return reset();
    case "KeyM":
      return toggleAudio();
    default:
      return;
  }
});

// --------------------------------------
// -------- Alert Handler----------------
// --------------------------------------
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

function hideAlert() {
  alertElement.classList.add("hidden");
  alertElement.classList.remove("flex");
}

// --------------------------------------
// -------- Window Loader ---------------
// --------------------------------------
window.addEventListener("load", () => {
  updateStorage();
  drawBoard();
  // updateSoundElement();
});
