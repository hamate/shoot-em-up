import Enemy from "./Enemy";

export default class Enemies {
  enemies: Enemy[] = [];
  enemyId: number = 0;
  enemyCoords: number[][] = [[]];
  x: number;
  y: number;

  drawEnemies(ctx: CanvasRenderingContext2D) {
    const enemies = this.enemies;
    setInterval(() => {
      enemies.push(new Enemy(this.enemyId));
      this.enemyId += 1;
    }, 2000);

    function moveEnemy(): void {
      ctx.clearRect(0, 0, 800, 600);
      enemies.forEach((enemy: Enemy) => {
        if (!enemy.destroyed) {
          enemy.moveEnemy();
          enemy.drawEnemy(ctx);
        }
        if (enemy.x < -150) {
          enemies.shift();
        }
      });
      requestAnimationFrame(moveEnemy);
    }
    moveEnemy();
  }
}
