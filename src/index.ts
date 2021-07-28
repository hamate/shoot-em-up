import Background from './Background';
import Enemy from './Enemy';
import Intro from './Intro';
import Main from './Main';
import Ship from './Ship';
import './styles/intro.scss';
import './styles/main.scss';
import './styles/space.scss';

const canvas = document.querySelector('.background') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
const shipCanvas = document.querySelector('.ship-canvas') as HTMLCanvasElement;
const ctx2 = shipCanvas.getContext('2d');
const enemyCanvas = document.querySelector(
  '.enemy-canvas'
) as HTMLCanvasElement;
const ctx3 = enemyCanvas.getContext('2d');
shipCanvas.hidden = true;
enemyCanvas.hidden = true;

const intro = new Intro();
const main = new Main();
const background = new Background();
const ship = new Ship();

window.onload = () => {
  intro.drawIntro(ctx);

  setTimeout(() => {
    main.drawMain(ctx);

    intro.deleteText();
    main.drawButtons();

    const startButton = Array.from(
      document.querySelectorAll('.start-game-btn')
    ) as HTMLButtonElement[];

    startButton.forEach((button: HTMLButtonElement) =>
      button.addEventListener('click', (e: Event) => {
        e.preventDefault();
        main.deleteScreen();
        intro.deleteText();
        shipCanvas.hidden = false;
        enemyCanvas.hidden = false;
        ctx.clearRect(0, 0, 800, 600);
        background.drawArea(ctx);
        ship.drawShip(ctx2);
      })
    );
  }, 2000);
};

let enemies: Enemy[] = [];
let enemyId: number = 0;
let enemyCoords: number[][] = [[]];
let enemyX: number;
let enemyY: number;
setInterval(() => {
  enemyId++;
  enemyX = 600;
  enemyY = Math.random() * 600;
  function checkEnemyPosition(y: number) {
    if (
      enemyCoords.length > 0 &&
      enemyCoords.filter((coords) => coords[1] < y + 75 && coords[1] > y - 75)
        .length > 0
    ) {
      y = Math.random() * 600;
      checkEnemyPosition(y);
    } else {
      enemyY = y;
    }
  }
  checkEnemyPosition(enemyY);

  enemyCoords.push([enemyX, enemyY]);
  enemies.push(new Enemy(enemyId, enemyX, enemyY));
  enemies.map((enemy) => {
    if (enemy.enemyId === enemyId) enemy.drawEnemy(ctx3);
  });

  if (enemyId > 5) clearInterval();
}, 1000);

let velY: number = 0;
let velX: number = 0;
let speed: number = 3;
let friction: number = 0.94;
let keys: boolean[] = [];

function update() {
  requestAnimationFrame(update);

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

  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  ship.drawShip(ctx2);
}

update();

document.body.addEventListener('keydown', function (e: any): void {
  keys[e.keyCode] = true;
});

document.body.addEventListener('keyup', function (e: any): void {
  keys[e.keyCode] = false;
});
