export default class Intro {
  drawIntro(ctx: CanvasRenderingContext2D) {
    const introImage = new Image();
    introImage.src = './img/intro.jpeg';
    ctx.fillRect(0, 0, 800, 600);
    ctx.drawImage(introImage, 0, 75, 800, 450);
    this.createText();
  }

  createText() {
    const mainTitle = document.createElement('div');
    const glitch = document.createElement('div');
    const glow = document.createElement('div');
    const scanlines = document.createElement('div');
    document.body.appendChild(mainTitle);
    mainTitle.className = 'main-title';
    glitch.className = 'glitch';
    glitch.setAttribute('data-text', "Shoot'em Up")
    glitch.innerText = `Shoot'em Up`;
    glow.className = 'glow';
    glow.innerText = `Shoot'em Up`;
    scanlines.className = 'scanlines';
    mainTitle.appendChild(glitch);
    mainTitle.appendChild(glow);
    mainTitle.appendChild(scanlines);
    mainTitle.style.zIndex = '2';
  }

  deleteText() {
    document.querySelector('.main-title').remove();
  }
}
