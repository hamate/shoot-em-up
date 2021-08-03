import Background from "./Background";
import Enemies from "./Enemies";
import Intro from "./Intro";
import Main from "./Main";
import Ship from "./Ship";
import EndGame from "./EndGame";
import "./styles/intro.scss";
import "./styles/main.scss";
import "./styles/space.scss";
import Enemy from "./Enemy";

const canvas = document.querySelector(".background") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const shipCanvas = document.querySelector(".ship-canvas") as HTMLCanvasElement;
const ctx2 = shipCanvas.getContext("2d");
const enemyCanvas = document.querySelector(
  ".enemy-canvas"
) as HTMLCanvasElement;
const ctx3 = enemyCanvas.getContext("2d");
const shotCanvas = document.querySelector(".shot-canvas") as HTMLCanvasElement;
const ctx4 = shotCanvas.getContext("2d");
const explosionCanvas = document.querySelector(
  ".explosion-canvas"
) as HTMLCanvasElement;
const ctx5 = explosionCanvas.getContext("2d");
shipCanvas.hidden = true;
enemyCanvas.hidden = true;
shotCanvas.hidden = true;
explosionCanvas.hidden = true;

const intro = new Intro();
const main = new Main();
const background = new Background();
const ship = new Ship();
const enemies = new Enemies();
const endGame = new EndGame();

function startGame() {
  intro.drawIntro(ctx);

  setTimeout(() => {
    main.drawMain(ctx);

    intro.deleteText();
    main.drawButtons();

    const startButton = Array.from(
      document.querySelectorAll(".start-game-btn")
    ) as HTMLButtonElement[];

    startButton.forEach((button: HTMLButtonElement) =>
      button.addEventListener("click", (e: Event) => {
        e.preventDefault();
        main.deleteScreen();
        intro.deleteText();
        shipCanvas.hidden = false;
        enemyCanvas.hidden = false;
        shotCanvas.hidden = false;
        explosionCanvas.hidden = false;
        ctx.clearRect(0, 0, 800, 600);
        background.drawArea(ctx);
        ship.deltaX = 0;
        ship.deltaY = 0;
        ship.drawShip(ctx2);
        enemies.drawEnemies(ctx3);
      })
    );
  }, 2000);
}

window.onload = () => {
  startGame();
};

let velY: number = 0;
let velX: number = 0;
let speed: number = 3;
let friction: number = 0.94;
let keys: boolean[] = [];
let gameOn = true;

function drawGameOver(enemy: Enemy) {
  gameOn = false;
  ship.destroyShip(ctx2);

  setTimeout(() => {
    document.querySelector(".ship-canvas").remove();
    document.querySelector(".enemy-canvas").remove();
    endGame.drawEndGame(ctx);
  }, 2000);

  setTimeout(() => {
    location.reload();
  }, 3000);
}

function moveShip() {
  if (gameOn) {
    requestAnimationFrame(moveShip);
  }
  if (keys[38]) {
    if (velY > -speed) {
      velY--;
    }
  }

  if (keys[40]) {
    if (velY < speed) {
      velY++;
    }
  }
  if (keys[39]) {
    if (velX < speed) {
      velX++;
    }
  }
  if (keys[37]) {
    if (velX > -speed) {
      velX--;
    }
  }

  velY *= friction;
  ship.deltaY += velY;

  velX *= friction;
  ship.deltaX += velX;

  if (ship.deltaX >= canvas.width - 100) {
    ship.deltaX = canvas.width - 100;
  } else if (ship.deltaX <= 5) {
    ship.deltaX = 5;
  }

  if (ship.deltaY > canvas.height - 100) {
    ship.deltaY = canvas.height - 100;
  } else if (ship.deltaY <= 5) {
    ship.deltaY = 5;
  }

  let shipBorders = {
    shipTail: ship.shipPos[0] - 50,
    shipHead: ship.shipPos[0] + 50,
    shipTop: ship.shipPos[1] - 30,
    shipBot: ship.shipPos[1] + 30,
  };
  enemies.enemies.forEach((enemy) => {
    let enemyBorders = {
      enemyHead: enemy.x - 30,
      enemyBack: enemy.x + 30,
      enemyTop: enemy.y - 30,
      enemyBot: enemy.y + 30,
    };

    if (enemyBorders.enemyHead < shipBorders.shipHead) {
      if (
        enemyBorders.enemyTop < shipBorders.shipBot &&
        enemyBorders.enemyBot > shipBorders.shipBot
      ) {
        drawGameOver(enemy);
      }
      if (
        enemyBorders.enemyBot > shipBorders.shipTop &&
        enemyBorders.enemyTop < shipBorders.shipTop
      ) {
        drawGameOver(enemy);
      }
    }
  });

  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  ship.drawShip(ctx2);
}

moveShip();

document.body.addEventListener("keydown", function (e: any): void {
  keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e: any): void {
  keys[e.keyCode] = false;
});

document.body.addEventListener("keydown", function (e: any): void {
  if (e.keyCode === 32) {
    ship.shootRocket();
  }
});

function moveRocket(): void {
  requestAnimationFrame(moveRocket);
  ctx4.clearRect(0, 0, 800, 600);
  ship.rockets.forEach((rocket) => {
    rocket.drawRocket(ctx4);
    rocket.moveRocket();
    if (rocket.deltaX > 800) {
      ship.rockets.shift();
    }
    let rocketBorders = {
      rocketTail: rocket.rocketPos[0] - 5,
      rocketHead: rocket.rocketPos[0] + 5,
      rocketTop: rocket.rocketPos[1] - 5,
      rocketBot: rocket.rocketPos[1] + 5,
    };

    enemies.enemies.forEach((enemy, i) => {
      let enemyBorders = {
        enemyHead: enemy.x - 20,
        enemyBack: enemy.x + 20,
        enemyTop: enemy.y - 20,
        enemyBot: enemy.y + 20,
      };
      if (enemyBorders.enemyHead < rocketBorders.rocketHead) {
        if (
          enemyBorders.enemyTop < rocketBorders.rocketBot &&
          enemyBorders.enemyBot > rocketBorders.rocketBot
        ) {
          enemy.destroyEnemy(ctx5, enemy.x, enemy.y);
        }
        if (
          enemyBorders.enemyBot > rocketBorders.rocketTop &&
          enemyBorders.enemyTop < rocketBorders.rocketTop
        ) {
          enemy.destroyEnemy(ctx5, enemy.x, enemy.y);
        }
      }
      if (enemy.destroyed) {
        enemies.enemies.splice(i, 1);
      }
    });
  });
}
moveRocket();
