export default class Enemy {
  x: number;
  y: number;
  deltaX: number = 0;
  deltaY: number = 0;
  enemyPos: number[] = [];
  enemySrc: string[] = [
    './img/Ship1.png',
    './img/Ship3.png',
    './img/Ship6.png',
  ];
  enemyId: number;

  constructor(enemyId: number, x: number, y: number) {
    this.enemyId = enemyId;
    this.x = x;
    this.y = y;
  }

  drawEnemy(ctx: CanvasRenderingContext2D) {
    const enemyImg = new Image();
    enemyImg.src = this.enemySrc[Math.floor(Math.random() * 3)];
    this.enemyPos = [];
    this.enemyPos.push(this.x, this.y);

    ctx.drawImage(enemyImg, 500, this.y, 150, 150);
  }

  moveEnemy() {}
}
