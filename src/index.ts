import Background from "./Background";
import Ship from './Ship';


const canvas = document.querySelector(".background") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const playground = document.querySelector(".playground") as HTMLCanvasElement;
const ctx2 = playground.getContext("2d");


const background = new Background();
const ship = new Ship()


window.onload = () => {
  background.drawArea(ctx);
  ship.drawShip(ctx2);
};

let x: number = 150;  //initial x
let y: number = 150;  // initial y
let velY: number = 0;
let velX: number = 0;
let speed: number = 2; // max speed
let friction: number = 0.98; // friction
let keys: boolean[] = [];

function update() {
    requestAnimationFrame(update);

    // check the keys and do the movement.
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

    // apply some friction to y velocity.
    velY *= friction;
    y += velY;

    // apply some friction to x velocity.
    velX *= friction;
    x += velX;

    // bounds checking
    if (x >= 295) {
        x = 295;
    } else if (x <= 5) {
        x = 5;
    }

    if (y > 295) {
        y = 295;
    } else if (y <= 5) {
        y = 5;
    }

    // do the drawing
    ctx.clearRect(0, 0, 300, 300);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
}

update();

// key events
document.body.addEventListener("keydown", function (e: KeyboardEvent): any {
    keys[e.key] = true;
});

document.body.addEventListener("keyup", function (e: KeyboardEvent) {
    keys[e.key] = false;
});

// window.addEventListener("keydown", moveShip, false);

// function moveShip(event: any) {
//   // checks if walls array contains heroPos arr
//   const newShipPos: number[] = [];
//   const actualShipPos: number [] = [];

//   actualShipPos.push(ship.deltaX, ship.deltaY);
//   // function checkWall() {
//   //   for (let i = 0; i < wall.wallPos.length; i++) {
//   //     let checker = false;
//   //     for (let j = 0; j < wall.wallPos[i].length; j++) {
//   //       if (wall.wallPos[i][j] === newshipPos[j]) {
//   //         checker = true;
//   //       } else {
//   //         checker = false;
//   //         break;
//   //       }
//   //     }
//   //     if (checker) {
//   //       return true;
//   //     }
//   //   }
//   //   return false;
//   // }

//   switch (event.keyCode) {
//     case 37:
//       // left key pressed
//       if (ship.deltaX >= 72) {
//         ship.deltaX -= 72;
//       }
//       break;
//     case 38:
//       if (ship.deltaY >= 72) {
//         ship.deltaY -= 72;
//       }
//       // up key pressed
//       break;
//     case 39:
//       if (ship.deltaX < 720 - 72) {
//         ship.deltaX += 72;
//       }
//       // right key pressed
//       break;
//     case 40:
//       if (ship.deltaY < 600 - 100) {
//         ship.deltaY += 72;
//       }
//       // down key pressed
//       break;
//   }

//   event.preventDefault();

//   newShipPos.push(ship.deltaX, ship.deltaY);
//   ctx2.clearRect(0, 0, canvas.width, canvas.height);
//   ship.drawShip(ctx2);
//   // if (!checkWall()) {
//   // } else {
//   //   ship.deltaX = actualShipPos[0];
//   //   ship.deltaY = actualShipPos[1];
//   // }
// }
