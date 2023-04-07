import "toastify-js/src/toastify.css";

import { PerspectiveCamera, WebGLRenderer } from "three";

import BoardScene from "./scenes/BoardScene";
import MainMenuScene from "./scenes/MenuScene";

// Query Selectors
const canvasElement = document.querySelector("#board") as HTMLCanvasElement;
const btnAbout = document.querySelector("#btn-about") as HTMLButtonElement;
const btnAboutClose = document.querySelector(
  "#btn-about-close"
) as HTMLButtonElement;
const aboutModalOverlay = document.querySelector(
  "#about-modal-overlay"
) as HTMLDivElement;
const btnSettings = document.querySelector(
  "#btn-settings"
) as HTMLButtonElement;
const btnSettingsClose = document.querySelector(
  "#btn-settings-close"
) as HTMLButtonElement;
const settingsModalOverlay = document.querySelector(
  "#settings-modal-overlay"
) as HTMLDivElement;
const btnFullScreen = document.querySelector(
  "#btn-fullscreen"
) as HTMLButtonElement;
const canvasWrapper = document.querySelector(
  "#board-wrapper"
) as HTMLDivElement;

let width = canvasWrapper.clientWidth;
let height = canvasWrapper.clientHeight;

const renderer = new WebGLRenderer({
  canvas: canvasElement,
  antialias: true,
  precision: "mediump",
});

renderer.setSize(width, height);

let currentScene: MainMenuScene | BoardScene;

const mainCamera = new PerspectiveCamera(60, width / height, 0.1, 1000);

const mainMenuScene = new MainMenuScene();
const boardScene = new BoardScene();

currentScene = mainMenuScene;
const render = () => {
  currentScene.update();
  renderer.render(currentScene, mainCamera);
  requestAnimationFrame(render);
};

const main = async () => {
  await mainMenuScene.load();
  await boardScene.load();
  currentScene.initialize();
  render();
};

function displayAboutModal() {
  const aboutModal = document.querySelector("#about-modal") as HTMLInputElement;
  aboutModal.classList.add("block");
  aboutModal.classList.remove("hidden");
}

function hideAboutModal() {
  const aboutModal = document.querySelector("#about-modal") as HTMLInputElement;
  aboutModal.classList.add("hidden");
  aboutModal.classList.remove("block");
}

function displaySettingsModal() {
  const aboutModal = document.querySelector(
    "#settings-modal"
  ) as HTMLInputElement;
  aboutModal.classList.add("block");
  aboutModal.classList.remove("hidden");
}

function hideSettingsModal() {
  const aboutModal = document.querySelector(
    "#settings-modal"
  ) as HTMLInputElement;
  aboutModal.classList.add("hidden");
  aboutModal.classList.remove("block");
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

const switchToBoardScene = () => {
  currentScene.hide();
  currentScene = boardScene;
  currentScene.initialize();
};

const switchToMainMenuScene = () => {
  currentScene.hide();
  currentScene = mainMenuScene;
  currentScene.initialize();
};

function onWindowLoad() {
  main();
  if (typeof mainMenuScene.user !== "undefined") {
    switchToBoardScene();
  } else {
    switchToMainMenuScene();
  }
}

function onWindowResize() {
  width = canvasWrapper.clientWidth;
  height = canvasWrapper.clientHeight;

  mainCamera.aspect = width / height;
  mainCamera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

// Event Listeners
btnAbout.addEventListener("click", displayAboutModal);
btnAboutClose.addEventListener("click", hideAboutModal);
aboutModalOverlay.addEventListener("click", hideAboutModal);

btnSettings.addEventListener("click", displaySettingsModal);
btnSettingsClose.addEventListener("click", hideSettingsModal);
settingsModalOverlay.addEventListener("click", hideSettingsModal);
btnFullScreen.addEventListener("click", toggleFullScreen);

window.addEventListener("load", onWindowLoad);
window.addEventListener("resize", onWindowResize);
