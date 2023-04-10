import {
  AmbientLight,
  AnimationMixer,
  Clock,
  Color,
  DirectionalLight,
  Scene,
} from "three";

import { createToast } from "../utils";

const boardSceneContent = document.querySelector(
  "#board-scene"
) as HTMLDivElement;

export default class BoardScene extends Scene {
  private delta = 0;
  private clock = new Clock();
  private animationMixer!: AnimationMixer;

  constructor() {
    super();
  }

  async load() {
    // Ambient light
    const ambient = new AmbientLight(0xffffff, 2.5);
    this.add(ambient);

    // DirectionalLight
    const light = new DirectionalLight(0xffffff, 2.5);
    light.position.set(0, 40, -10);
    this.add(light);

    // Load the background texture
    this.background = new Color("#d2e5d2");
  }

  initialize() {
    if (this.visible) {
      boardSceneContent.classList.add("block");
      boardSceneContent.classList.remove("hidden");
    } else {
      this.visible = !this.visible;
    }

    if (!this.clock.running) {
      this.clock.start();
    }
  }

  update() {
    if (this.animationMixer) {
      this.delta = this.clock.getDelta();
      this.animationMixer.update(this.delta);
    }
  }
  hide() {
    this.visible = false;
    this.clock.stop();
    boardSceneContent.classList.add("hidden");
    boardSceneContent.classList.remove("block");
  }
}
