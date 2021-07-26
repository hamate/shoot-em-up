export default class Ship {
  deltaX: number = 0;
  deltaY: number = 0;
  shipPos: number[] = [];
  shipSrc: string = "./img/Ship5.png";

  drawShip(ctx: CanvasRenderingContext2D) {
    const shipImg = new Image(72, 72);
    shipImg.src = this.shipSrc;
    this.shipPos = [];
    ctx.drawImage(shipImg, 0 + this.deltaX, 0 + this.deltaY, 72, 72);
    this.shipPos.push(this.deltaX, this.deltaY);
  }
}
