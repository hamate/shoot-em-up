import Star from './Star';
import Intro from './Intro';

export default class Main {
  drawMain(ctx: CanvasRenderingContext2D) {
    const title = new Intro();
    title.drawIntro(ctx);
    let centerX = 400;
    let centerY = 300;

    let stars: Star[] = [];
    for (let i = 0; i < 100; i++) {
      stars[i] = new Star();
    }

    function animateStars() {
      for (let i = 0; i < stars.length; i++) {
        stars[i].z = stars[i].z - stars[i].speed;
        if (stars[i].z <= 0) {
          stars[i].z = 800;
        }
        stars[i].x = (stars[i].x - centerX) * (800 / stars[i].z);
        stars[i].x = stars[i].x + centerX;
        stars[i].y = (stars[i].y - centerY) * (800 / stars[i].z);
        stars[i].y = stars[i].y + centerY;
        stars[i].size = stars[i].size * (800 / stars[i].z);
        if (
          stars[i].x <= 0 ||
          stars[i].x > 800 ||
          stars[i].y <= 0 ||
          stars[i].y > 600
        ) {
          stars[i] = new Star();
        }
        ctx.beginPath();
        ctx.arc(stars[i].x, stars[i].y, stars[i].size, 0, 360);
        ctx.fillStyle = 'white';
        ctx.fill();
      }
    }

    function update() {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, 800, 600);
      animateStars();
      window.requestAnimationFrame(update);
    }

    update();
  }

  drawButtons() {
    const panel = document.createElement('div');
    panel.className = 'control-panel';
    for (let i: number = 0; i < 4; i++) {
      let button = document.createElement('button');
      let span = document.createElement('span');
      span.innerHTML = `GAME${i + 1}`;
      span.className = 'cybr-btn__glitch';
      if (i < 3) {
        button.className = 'cybr-btn start-game-btn';
        button.innerHTML = `GAME${i + 1}`;
      } else {
        button.className = 'cybr-btn end-game-btn';
        button.innerHTML = `EXIT`;
      }
      button.appendChild(span);
      panel.appendChild(button);
    }
    document.body.appendChild(panel);
    panel.style.position = 'absolute';
    document.querySelector('.end-game-btn').addEventListener('click', () => {
      window.location.href = 'http://nasa.gov';
    });
  }

  deleteScreen() {
    document.querySelector('.control-panel').remove();
  }
}
