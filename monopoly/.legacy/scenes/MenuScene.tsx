import {
  AmbientLight,
  AnimationMixer,
  Clock,
  Color,
  DirectionalLight,
  Scene,
} from "three";

import { IUser, User } from "../objects";
import { createToast } from "../utils";

const formUser = document.querySelector("#form-user") as HTMLFormElement;
const randomBtn = formUser.querySelector("#btn-random") as HTMLButtonElement;
const submitBtn = formUser.querySelector("#btn-submit") as HTMLButtonElement;
const nameInput = formUser.querySelector("#input-name") as HTMLButtonElement;
const mainSceneContent = document.querySelector(
  "#main-scene"
) as HTMLDivElement;

export default class MainMenuScene extends Scene {
  private delta = 0;
  public user?: IUser;
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

  private createUser(event: SubmitEvent) {
    if (!this.user) {
      event.preventDefault();
      try {
        const formData = new FormData(formUser);
        const name = formData.get("name") as string;
        const user = new User({ name });
        this.user = user.getInfo();
      } catch (error) {
        const message = error as string;
        return createToast({ message, type: "error" });
      }
    }
    return false;
  }

  private async getRandomUser() {
    try {
      const apiURL = "https://randomuser.me/api/?nat=us,gb";
      const response = await fetch(apiURL);
      const { results } = await response.json();
      const { first, last } = results[0]?.name;
      nameInput.value = `${first} ${last}`;
      nameInput.focus();
      return false;
    } catch (error: any) {
      const message = error?.message as string;
      return createToast({ message, type: "error" });
    }
  }

  initialize() {
    formUser.addEventListener("submit", this.createUser);
    submitBtn.addEventListener("click", formUser.submit);
    randomBtn.addEventListener("click", this.getRandomUser);

    if (this.visible) {
      mainSceneContent.classList.add("block");
      mainSceneContent.classList.remove("hidden");
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
    mainSceneContent.classList.add("hidden");
    mainSceneContent.classList.remove("block");
  }
}
