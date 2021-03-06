export default class EndGame {
  drawEndGame(ctx: CanvasRenderingContext2D) {
    const introImage = new Image();
    introImage.src = "./img/intro.jpeg";
    ctx.fillRect(0, 0, 800, 600);
    ctx.drawImage(introImage, 0, 75, 800, 450);
    this.createText();
  }

  createText() {
    const endTitle = document.createElement("div");
    const glitch = document.createElement("div");
    const glow = document.createElement("div");
    const scanlines = document.createElement("div");
    document.body.appendChild(endTitle);
    endTitle.className = "end-title";
    glitch.className = "glitch";
    glitch.setAttribute("data-text", "GAME OVER");
    glitch.innerText = `GAME OVER`;
    glow.className = "glow";
    glow.innerText = `GAME OVER`;
    scanlines.className = "scanlines";
    endTitle.appendChild(glitch);
    endTitle.appendChild(glow);
    endTitle.appendChild(scanlines);
    endTitle.style.zIndex = "2";
  }

  deleteText() {
    document.querySelector(".end-title").remove();
  }
}
