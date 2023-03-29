// --------------------------------------
// -------- Query Selectors -------------
// --------------------------------------
const canvas = document.querySelector("#board");
const tracks = document.querySelectorAll("audio");
const alertElement = document.querySelector("#alert");
const btnSound = document.querySelector("button#btn-sound");

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
let score = 0;
let board = [];
let audio = false;
let bestScore = 0;
let gameOver = false;
const maxScore = 99999;

function play() {
  return;
}

function reset() {
  return window.location.reload();
}

// --------------------------------------
// ------------- Audio ------------------
// --------------------------------------
function toggleAudio() {
  if (!tracks) return;
  try {
    tracks.forEach((track) => {
      if (audio) {
        audio = false;
        track.volume = 0;
        track.muted = true;
      } else {
        audio = true;
        track.volume = 0.5;
        track.muted = false;
      }
    });
  } catch (error) {
    console.log(error);
  }

  return updateSoundElement();
}

function updateSoundElement() {
  const soundOnIcon = btnSound.querySelector("#sound-on");
  const soundOffIcon = btnSound.querySelector("#sound-off");

  if (audio) {
    soundOffIcon.classList.add("hidden");
    soundOnIcon.classList.remove("hidden");
  } else {
    soundOnIcon.classList.add("hidden");
    soundOffIcon.classList.remove("hidden");
  }
  return;
}

btnSound.addEventListener("click", () => {
  console.log("sound button clicked!!");
});

// --------------------------------------
// ------------- Controls ---------------
// --------------------------------------
btnSound.addEventListener("click", () => {
  console.log("sound button clicked!!");
  return toggleAudio();
});

alertElement.querySelector("#alert-content").addEventListener("click", () => {
  console.log("play button clicked!!");
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
      console.log(`You've pressed ${event.code}`);
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

window.addEventListener("load", () => {
  updateStorage();
  updateSoundElement();
});
