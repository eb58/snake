const snakeGame = (w, h) => {
  const snake = snakeModel(w, h, 10);
  const snakeVw = snakeView(w, h);

  let delay = 150; // millisec
  let pause = false;
  let directionVec = { dx: -1, dy: 0 };

  const noop = () => { };
  const noPause = () => (pause = false);
  const togglePause = () => pause = !pause;
  const setDelay = ms => delay = ms;
  const allowedDirection = (dx, dy) => !(directionVec.dx !== 0 && dx === -directionVec.dx) && !(directionVec.dy !== 0 && dy === -directionVec.dy)
  const setDirection = (dx, dy) => () => { noPause(), directionVec = allowedDirection(dx, dy) ? { dx, dy } : directionVec };

  const handlermap = {
    32: togglePause, // space
    37: setDirection(-1, +0), // right
    38: setDirection(+0, -1), // down
    39: setDirection(+1, +0), // left
    40: setDirection(+0, +1), // up
  };

  const init = id => $(id).keydown(e => (handlermap[e.keyCode] || noop)());

  const play = (id) => {
    init(id);
    snakeVw.drawSnake(snake.getSnakeArr());
    snakeVw.drawFruit(snake.getFruit());

    const timerid = setInterval(() => {
      if (pause)
        return;
      const oldArr = snake.updateSnake(directionVec);
      if (snake.hasCollision()) {
        snakeVw.redrawSnake(oldArr, snake.getSnakeArr(), true);
        clearInterval(timerid);
        return;
      }
      if (snake.hasEatenFruit()) {
        snake.doFeed(5);
        snakeVw.drawFruit(snake.getFruit());
      }
      snakeVw.redrawSnake(oldArr, snake.getSnakeArr(), false);
    }, delay);
  }
  // API 
  return {
    play,
    setDelay,
  };
};
