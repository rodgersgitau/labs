import {
  AmbientLight,
  AnimationMixer,
  Clock,
  DirectionalLight,
  Scene,
  TextureLoader,
} from "three";

import bgImage from "../assets/images/background.jpg";

export default class MainMenuScene extends Scene {
  private textureLoader = new TextureLoader();

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
    const bgTexture = this.textureLoader.load(bgImage);
    this.background = bgTexture;
  }

  private displayAboutModal() {
    const aboutModal = document.querySelector(
      "#about-modal"
    ) as HTMLInputElement;
    aboutModal.classList.add("block");
    aboutModal.classList.remove("hidden");
  }

  private hideAboutModal() {
    const aboutModal = document.querySelector(
      "#about-modal"
    ) as HTMLInputElement;
    aboutModal.classList.add("hidden");
    aboutModal.classList.remove("block");
  }

  private displaySettingsModal() {
    const aboutModal = document.querySelector(
      "#settings-modal"
    ) as HTMLInputElement;
    aboutModal.classList.add("block");
    aboutModal.classList.remove("hidden");
  }

  private hideSettingsModal() {
    const aboutModal = document.querySelector(
      "#settings-modal"
    ) as HTMLInputElement;
    aboutModal.classList.add("hidden");
    aboutModal.classList.remove("block");
  }

  initialize() {
    // Query Selectors
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

    // Event Listeners
    btnAbout.addEventListener("click", this.displayAboutModal);
    btnAboutClose.addEventListener("click", this.hideAboutModal);
    aboutModalOverlay.addEventListener("click", this.hideAboutModal);

    btnSettings.addEventListener("click", this.displaySettingsModal);
    btnSettingsClose.addEventListener("click", this.hideSettingsModal);
    settingsModalOverlay.addEventListener("click", this.hideSettingsModal);

    if (!this.visible) {
      this.visible = true;
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
}
