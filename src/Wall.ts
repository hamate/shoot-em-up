/* eslint-disable lines-between-class-members */
/* eslint-disable class-methods-use-this */
export default class Wall {
  isWall: boolean;
  wallPos: number[][] = [];

// STATIC MAP LVL1

  wallMapLvl1: number [][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 1, 1],
    [0, 0, 1, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
];

  drawWall(ctx: CanvasRenderingContext2D) {
    const wallImg = new Image(72, 72);
    wallImg.src = "./img/wall.png";

    let yPos = 0;
    for (let i = 0; i <= this.wallMapLvl1.length; i++) {
      let xPos = 0;
      for (let j = 0; j <= this.wallMapLvl1[i].length; j++) {
        if (this.wallMapLvl1[i][j] === 1) {
          ctx.drawImage(wallImg, xPos, yPos, 72, 72);
          this.wallPos.push([xPos, yPos]);
        }
        xPos = (j + 1) * 72;
      }
      yPos = (i + 1) * 72;
    }
}

//  RANDOM MAP GENERATOR

//   drawWall(ctx: CanvasRenderingContext2D) {
//     const wallImg = new Image(72, 72);
//     wallImg.src = "./img/wall.png";

//     let i: number = 0;
//     while (i < 40) {
//       let xPos: number = Math.floor(Math.random() * 10) * 72;
//       let yPos: number = Math.floor(Math.random() * 10) * 72;
//       if (xPos !== 0 && yPos !== 0) {
//         ctx.drawImage(wallImg, xPos, yPos, 72, 72);
//         this.wallPos.push([xPos, yPos]);
//       }
//       i++;
//     }
//   }
}
