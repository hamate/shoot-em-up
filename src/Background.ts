import Layer from './Layer';

export default class Background {
  drawArea(ctx: CanvasRenderingContext2D) {
    const background = new Image();
    background.src = './img/nebula.png';
    const rocks = new Image();
    rocks.src = './img/Rocks.png';
    const ground = new Image();
    ground.src = './img/Ground.png';
    const groundFront = new Image();
    groundFront.src = './img/GroundFront.png';

    const layer1 = new Layer(background, 0.02);
    const layer2 = new Layer(rocks, 0.6);
    const layer3 = new Layer(ground, 2);
    const layer4 = new Layer(groundFront, 2.5);

    const backgroundLayers = [layer1, layer2, layer3, layer4];

    function animate():void {
      ctx.clearRect(0, 0, 800, 600);
      backgroundLayers.forEach((layer) => {
        layer.update();
        layer.draw(ctx);
      });
      requestAnimationFrame(animate);
    }
    animate();
  }
}
