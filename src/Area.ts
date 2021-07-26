/* eslint-disable class-methods-use-this */
export default class Area {
  drawArea(ctx: CanvasRenderingContext2D) {
    const floor = new Image(72, 72);
    floor.src = "./img/floor.png";

    for (let i: number = 0; i < 720; i += 72) {
      for (let k: number = 0; k < 720; k += 72) {
        ctx.drawImage(floor, i, k, 72, 72);
      }
    }
  }
}
