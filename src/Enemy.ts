export default class Enemy {
  enemyId: number;
  x: number = 800;
  y: number = Math.random() * 500;
  deltaX: number = 0;
  deltaY: number = 0;
  enemyPos: number[] = [];
  enemySrc: string[] = [
    "./img/Ship1.png",
    "./img/Ship3.png",
    "./img/Ship6.png",
  ];
  enemyCoords: number[][] = [[]];
  enemyImg: HTMLImageElement = new Image();
  src: string = this.enemySrc[Math.floor(Math.random() * 3)];
  startY: number = this.y;
  speed: number = Math.random() * (2 - 0.7) + 0.7;
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
    "./img/empty.png",
  ];
  destroyed: boolean = false;

  constructor(id: number) {
    this.enemyId = id;
  }

  drawEnemy(ctx: CanvasRenderingContext2D) {
    if (!this.destroyed) {
      this.enemyImg.src = this.src;
      this.enemyPos = [];
      this.enemyPos.push(this.x, this.y);
      this.enemyCoords.push([this.x, this.y]);
      ctx.drawImage(this.enemyImg, this.x, this.y, 120, 120);
    }
  }

  moveEnemy() {
    this.x -= 1;

    this.deltaY++;
    if (this.deltaY <= 200) {
      if (this.y <= 50) {
        this.deltaY += 200 - this.deltaY;
        this.y += 1 * this.speed;
      } else {
        this.y -= 1 * this.speed;
      }
    } else {
      if (this.y >= 550) {
        this.y -= 1 * this.speed;
        this.deltaY = 0;
      } else {
        this.y += 1 * this.speed;
      }
    }
    if (this.deltaY === 400) {
      this.deltaY = 0;
    }
  }

  checkEnemyPosition(y: number) {
    if (
      this.enemyCoords.length > 0 &&
      this.enemyCoords.filter(
        (coords: number[]) => coords[1] < y + 75 && coords[1] > y - 75
      ).length > 0
    ) {
      y = Math.random() * 600;
      this.checkEnemyPosition(y);
    } else {
      this.y = y;
    }
  }

  destroyEnemy(ctx: CanvasRenderingContext2D, x: number, y: number) {
    let i: number = 0;
    this.destroyed = true;
    this.x = -100;
    this.y = -100;
    const id = setInterval(() => {
      ctx.clearRect(x, y, 150, 150);
      const expImg = new Image();
      expImg.src = this.explosion[i];
      ctx.drawImage(expImg, x, y, 150, 150);
      i++;
      i == 12 && clearInterval(id);
    }, 50);
  }
}
