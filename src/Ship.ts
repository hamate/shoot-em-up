/* eslint-disable lines-between-class-members */
/* eslint-disable class-methods-use-this */
import Character from "./Character";

export default class Ship extends Character {
  deltaX: number = 0;
  deltaY: number = 0;
  shipPos: number[] = [];
  shipSrc: string = "./img/Ship5.png";
  constructor() {
    super(20, 2, 5);
  }

  drawShip(ctx: CanvasRenderingContext2D) {
    const shipImg = new Image(72, 72);
    shipImg.src = this.shipSrc;
    this.shipPos = [];
    ctx.drawImage(shipImg, 0 + this.deltaX, 0 + this.deltaY, 72, 72);
    this.shipPos.push(this.deltaX, this.deltaY);
  }
}
