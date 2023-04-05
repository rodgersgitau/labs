import { PerspectiveCamera, WebGLRenderer } from "three";

import MainMenuScene from "./scenes/MenuScene";

const width = window.innerWidth;
const height = window.innerHeight;
const canvasElement = document.querySelector("#board") as HTMLCanvasElement;

const renderer = new WebGLRenderer({
  canvas: canvasElement,
  antialias: true,
  precision: "mediump",
});

renderer.setSize(width, height);

let currentScene: MainMenuScene;

const mainCamera = new PerspectiveCamera(60, width / height, 0.1, 1000);

const mainMenuScene = new MainMenuScene();

currentScene = mainMenuScene;
const render = () => {
  currentScene.update();
  renderer.render(currentScene, mainCamera);
  requestAnimationFrame(render);
};

const main = async () => {
  await mainMenuScene.load();
  currentScene.initialize();
  render();
};

function onWindowLoad() {
  main();
}

function onWindowResize() {
  mainCamera.aspect = window.innerWidth / window.innerHeight;
  mainCamera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);
window.addEventListener("load", onWindowLoad);
