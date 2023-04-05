import * as THREE from "three";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { TexturePass } from "three/addons/postprocessing/TexturePass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { CopyShader } from "three/addons/shaders/CopyShader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import bgImage from "./assets/images/default.jpg";

// Query Selectors
const board = document.querySelector("#board");
const dialog = document.querySelector("#dialog");
const btnClose = document.querySelector("#btn-close");
const btnSettings = document.querySelector("#btn-settings");
const dialogOverlay = document.querySelector("#dialog-overlay");

// variables
let showDialog = false;

// Event Handlers
btnSettings.addEventListener("click", () => {
  return toggleSettings();
});

btnClose.addEventListener("click", () => {
  return toggleSettings();
});

dialogOverlay.addEventListener("click", () => {
  return toggleSettings();
});

// Keyboard controls
document.addEventListener("keydown", (event) => {
  switch (event.code.toString()) {
    case "Escape":
      return toggleSettings();
    default:
      // console.log(event.code);
      break;
  }
});

// Misc
function toggleSettings() {
  if (showDialog) {
    showDialog = false;
    return dialog.classList.remove("hidden");
  } else {
    showDialog = true;
    return dialog.classList.add("hidden");
  }
}

// Game Logic
let scene, renderer, composer, cameraP;
let texturePass, renderPass;

const params = {
  clearPass: true,
  clearColor: "white",
  clearAlpha: 1.0,

  texturePass: true,
  texturePassOpacity: 1.0,

  renderPass: true,
};

function init() {
  const width = board.clientWidth || 1;
  const height = board.clientHeight || 1;
  const aspect = width / height;
  const devicePixelRatio = window.devicePixelRatio || 1;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.setPixelRatio(devicePixelRatio);
  board.appendChild(renderer.domElement);

  cameraP = new THREE.PerspectiveCamera(65, aspect, 1, 10);
  cameraP.position.z = 7;

  scene = new THREE.Scene();

  const group = new THREE.Group();
  scene.add(group);

  const light = new THREE.PointLight(0xddffdd, 1.0);
  light.position.z = 70;
  light.position.y = -70;
  light.position.x = -70;
  scene.add(light);

  composer = new EffectComposer(renderer);

  texturePass = new TexturePass();
  composer.addPass(texturePass);

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(bgImage, function (map) {
    texturePass.map = map;
  });

  renderPass = new RenderPass(scene, cameraP);
  renderPass.clear = false;
  composer.addPass(renderPass);

  const copyPass = new ShaderPass(CopyShader);
  composer.addPass(copyPass);

  const controls = new OrbitControls(cameraP, renderer.domElement);
  controls.enableZoom = false;

  window.addEventListener("resize", onWindowResize);
}

function animate() {
  requestAnimationFrame(animate);

  texturePass.enabled = params.texturePass;
  texturePass.opacity = params.texturePassOpacity;

  renderPass.enabled = params.renderPass;

  composer.render();
}

// Window

function onWindowLoad() {
  init();
  animate();
}

function onWindowResize() {
  const width = board.clientWidth;
  const height = board.clientHeight;
  const aspect = width / height;

  cameraP.aspect = aspect;
  cameraP.updateProjectionMatrix();

  renderer.setSize(width, height);
  composer.setSize(width, height);
}

window.addEventListener("load", onWindowLoad);
window.addEventListener("resize", onWindowResize);
