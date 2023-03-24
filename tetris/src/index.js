// Query Selectors
const canvas = document.querySelector("#board");
const tutorial = document.querySelector("#tutorial");
const btnTutorial = document.querySelector("#btn-tutorial");

// Variables
let showTutorial = tutorial.classList.contains("hidden");

// Hide | Show Controls
const toggleControls = () => {
  tutorial.classList.toggle("hidden");
  showTutorial = tutorial.classList.contains("hidden");

  if (showTutorial === true) {
    btnTutorial.innerHTML = "Open Tutorial - [Q]";
  } else {
    btnTutorial.innerHTML = "Close Tutorial - [Q]";
  }
};

// Event Handlers
btnTutorial.addEventListener("click", () => {
  return toggleControls();
});

document.addEventListener("keydown", (event) => {
  console.log(event.code);
  switch (`${event.code}`) {
    case "KeyQ":
      return toggleControls();
    case "KeyP":
      console.log(`You've pressed ${event.code}`);
      break;
    case "KeyR":
      console.log(`You've pressed ${event.code}`);
      break;
    default:
      console.log(`You've pressed ${event.code}`);
      break;
  }
});

// Canvas
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#e0e7e2";
ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0],
];

// Game
