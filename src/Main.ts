export default class Main {
  drawMain(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(0, 0, 800, 600);
  }

  drawBackground(ctx: CanvasRenderingContext2D) {}

  drawButtons(ctx: CanvasRenderingContext2D) {
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
  }
}
