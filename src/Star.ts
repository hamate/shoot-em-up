export default class Star {
  x?: number;
  y?: number;
  z?: number;
  size?: number;
  radius?: number;
  speed?: number;

  constructor() {
    this.x = Math.random() * 800;
    this.y = Math.random() * 600;

    this.z = 800;
    this.size = 0.6;
    this.radius = Math.random() * 1.2;
    this.speed = 2;
  }
}
