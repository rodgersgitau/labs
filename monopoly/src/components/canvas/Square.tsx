import {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Scene,
} from "three";

export class Square extends BoxGeometry {
  public width: number = 20;
  public height: number = 20;

  constructor() {
    super();
  }
}

export class BoardScene extends Scene {
  public width: number = 20;
  public height: number = 20;

  constructor() {
    super();
    // Ambient light
    const ambient = new AmbientLight(0xffffff, 2.5);
    this.add(ambient);

    // DirectionalLight
    const light = new DirectionalLight(0xffffff, 2.5);
    light.position.set(0, 40, -10);
    this.add(light);

    const geometry = new PlaneGeometry(220, 220);
    const material = new MeshBasicMaterial({
      color: 0x00ff00,
    });
    const plane = new Mesh(geometry, material);
    plane.visible = true;
    this.add(plane);

    // const geometry = new BoxGeometry(this.width, this.height);
    // const geometry = new BoxGeometry(this.width, this.height);
  }
}
