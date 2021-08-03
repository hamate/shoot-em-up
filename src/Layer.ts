export default class Layer {
  x: number;
  y: number;
  speedMod: number;
  speed: number;
  gameSpeed: number = 2;
  width: number;
  height: number;
  x2: number;
  image: HTMLImageElement;

  constructor(image: HTMLImageElement, speedMod: number) {
    this.x = 0;
    this.speedMod = 0;
    this.y = 0;
    this.width = 800;
    this.height = 600;
    this.x2 = this.width;
    this.image = image;
    this.speedMod = speedMod;
    this.speed = this.gameSpeed * this.speedMod;
  }

  update() {
    this.speed = this.gameSpeed * this.speedMod;
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}
