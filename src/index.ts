import Background from './Background';
import Intro from './Intro';
import Main from './Main';
import Ship from './Ship';
import './styles/intro.scss'
import './styles/main.scss'

const canvas = document.querySelector('.background') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
const playground = document.querySelector('.playground') as HTMLCanvasElement;
const ctx2 = playground.getContext('2d');
playground.hidden = true;

const intro = new Intro();
const main = new Main();
const background = new Background();
const ship = new Ship();

window.onload = () => {
  intro.drawIntro(ctx);
  
  setTimeout(() => {
    main.drawMain(ctx);
    // playground.hidden = false;
    intro.deleteText();
    main.drawButtons(ctx);
    // ctx.clearRect(0, 0, 800, 600)
    // background.drawArea(ctx);
    // ship.drawShip(ctx2);
  }, 2000);
};

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

