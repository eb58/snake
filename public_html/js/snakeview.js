const snakeview = (w, h) => {
  const scale = 10;
  const COL = {
    background: '#aaa',
    backgroundFrame: '#000',
    snake: '#800',
    snakehead: '#ee0',
    snakehit: '#f00',
    fruit: '#0f0'
  };

  const createAttr = (fill, stroke, width) => ({fill, stroke, 'stroke-width': width});

  const attrFrame = createAttr(COL.background, COL.backgroundFrame, 8);
  const attrBackground = createAttr(COL.background, COL.background, 3);
  const attrSnake = createAttr(COL.snake, COL.snake, 3);
  const attrSnakeHead = createAttr(COL.snakehead, COL.snakehead, 3);
  const attrSnakeHit = createAttr(COL.snakehit, COL.snakehit, 3);
  const attrFruit = createAttr(COL.fruit, COL.fruit, 3);

  const paper = Raphael(10, 10, w * scale, h * scale);
  paper.rect(0, 0, w * scale, h * scale).attr(attrFrame);

  const drawSnake = (arr) => {
    arr.map(v => paper.circle(v.x * scale, v.y * scale, 3).attr(attrSnake));
  }

  const redrawSnake = (arrOld, arrNew, hit) => {
    //whipe out last segment of snake
    const tailOld = arrOld[arrOld.length-1];
    paper.circle(tailOld.x * scale, tailOld.y * scale, 4).attr(attrBackground);

    // draw new Head
    paper.circle(arrNew[0].x * scale, arrNew[0].y * scale, 3).attr(hit?attrSnakeHit:attrSnake);
  }

  const drawFruit = fruit => paper.circle(fruit.x * scale, fruit.y * scale, 3).attr(attrFruit);

  return {
    drawSnake,
    redrawSnake,
    drawFruit
  };
};
