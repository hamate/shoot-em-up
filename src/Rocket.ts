export default class Rocket {
  x: number = 45;
  y: number = 5;
  deltaX: number;
  deltaY: number;
  rocketPos: number[] = [];
  rocketSrc: string = "./img/shot.png";

  constructor(shipX: number, shipY: number) {
    this.deltaX = shipX;
    this.deltaY = shipY;
  }

  drawRocket(ctx: CanvasRenderingContext2D) {
    const rocketImg = new Image();
    rocketImg.src = this.rocketSrc;
    this.rocketPos = [];
    ctx.drawImage(
      rocketImg,
      this.deltaX + this.x,
      this.deltaY + this.y,
      100,
      100
    );
    this.rocketPos.push(this.deltaX + this.x, this.deltaY + this.y);
    this.moveRocket();
  }

  moveRocket() {
    this.deltaX += 3;
  }
}
