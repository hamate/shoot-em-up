import Rocket from "./Rocket";

export default class Ship {
  deltaX: number = 0;
  deltaY: number = 0;
  shipPos: number[] = [];
  shipSrc: string = "./img/Ship5.png";
  explosion: string[] = [
    "./img/Explosion1/Explosion1_1.png",
    "./img/Explosion1/Explosion1_2.png",
    "./img/Explosion1/Explosion1_3.png",
    "./img/Explosion1/Explosion1_4.png",
    "./img/Explosion1/Explosion1_5.png",
    "./img/Explosion1/Explosion1_6.png",
    "./img/Explosion1/Explosion1_7.png",
    "./img/Explosion1/Explosion1_8.png",
    "./img/Explosion1/Explosion1_9.png",
    "./img/Explosion1/Explosion1_10.png",
    "./img/Explosion1/Explosion1_11.png",
  ];
  rockets: Rocket[] = [];

  drawShip(ctx: CanvasRenderingContext2D) {
    const shipImg = new Image();
    shipImg.src = this.shipSrc;
    this.shipPos = [];
    ctx.drawImage(shipImg, 0 + this.deltaX, 0 + this.deltaY, 100, 100);
    this.shipPos.push(this.deltaX, this.deltaY);
  }

  destroyShip(ctx: CanvasRenderingContext2D) {
    let i: number = 0;
    const id = setInterval(() => {
      ctx.clearRect(0, 0, 800, 600);
      const expImg = new Image();
      expImg.src = this.explosion[i];
      ctx.drawImage(expImg, this.shipPos[0], this.shipPos[1], 150, 150);
      i++;
      i == 11 && clearInterval(id);
    }, 150);
  }

  shootRocket() {
    const rockets = this.rockets;
    const startPos = [this.shipPos[0], this.shipPos[1]];
    rockets.push(new Rocket(startPos[0], startPos[1]));
  }
}
