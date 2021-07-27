export default class Ship {
  deltaX: number = 0;
  deltaY: number = 0;
  shipPos: number[] = [];
  shipSrc: string = "./img/Ship5.png";

  drawShip(ctx: CanvasRenderingContext2D) {
    const shipImg = new Image();
    shipImg.src = this.shipSrc;
    this.shipPos = [];
    ctx.drawImage(shipImg, 0 + this.deltaX, 0 + this.deltaY, 100, 100);
    this.shipPos.push(this.deltaX, this.deltaY);
  }
}
