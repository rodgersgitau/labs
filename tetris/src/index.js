// Query Selectors
const canvas = document.querySelector("#board");
const tutorial = document.querySelector("#tutorial");
const btnStart = document.querySelector("#btn-start");
const btnReset = document.querySelector("#btn-reset");
const totalScore = document.querySelector("#total-score");
const btnTutorial = document.querySelector("#btn-tutorial");

// Global Variables
let showTutorial = tutorial.classList.contains("hidden");

// Hide | Show Controls
const toggleControls = () => {
  tutorial.classList.toggle("hidden");
  showTutorial = tutorial.classList.contains("hidden");

  if (showTutorial === true) {
    btnTutorial.innerHTML = "Open Tutorial - [Q]";
    btnTutorial.classList.remove("!text-kelp");
    btnTutorial.classList.remove("!bg-sprout-800");
    btnStart.classList.remove("hidden");
    btnReset.classList.remove("hidden");
  } else {
    btnStart.classList.add("hidden");
    btnReset.classList.add("hidden");
    btnTutorial.classList.add("!text-kelp");
    btnTutorial.classList.add("!bg-sprout-800");
    btnTutorial.innerHTML = "Close Tutorial - [Q]";
  }
};

// Event Handlers
btnTutorial.addEventListener("click", () => {
  return toggleControls();
});

btnStart.addEventListener("click", () => {
  return play();
});

btnReset.addEventListener("click", () => {
  return reset();
});

document.addEventListener("keydown", (event) => {
  switch (`${event.code}`) {
    case "KeyQ":
      return toggleControls();
    case "KeyP":
      return play();
    case "KeyR":
      return reset();
    default:
      console.log(`You've pressed ${event.code}`);
      break;
  }
});

// --------------------------------------
// ------------- Game Logic -------------
// --------------------------------------

// Variable for Board
const context = canvas.getContext("2d");

function play() {
  console.log("Playing ...");
}

function reset() {
  console.log("Reseting ...");
  setTimeout(() => {
    window.location.reload();
  }, 1500);
}

// --------------------------------------
// ------------- Particles -------------
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
      speed: 0.2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
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
