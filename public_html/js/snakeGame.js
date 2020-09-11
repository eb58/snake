const snakeGame = (w, h) => {
  const snake = snakeModel(w, h, 10);
  const snakeVw = snakeView(w, h);

  let delay = 150; // millisec
  let pause = false;
  let dirVec = { dx: -1, dy: 0 };

  const noop = () => { };
  const noPause = () => (pause = false);
  const togglePause = () => pause = !pause;
  const setDelay = ms => delay = ms;
  const allowedDirection = (dx, dy) => !(dirVec.dx !== 0 && dx === -dirVec.dx) && !(dirVec.dy !== 0 && dy === -dirVec.dy)
  const setDirection = (dx, dy) => () => { noPause(), dirVec = allowedDirection(dx, dy) ? { dx, dy } : dirVec };

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
    snakeVw.drawSnake(snake);
    snakeVw.drawFruit(snake);

    const timerid = setInterval(() => {
      if (pause)
        return;
      const last = snake.updateSnake(dirVec);
      if (snake.hasCollision()) {
        snakeVw.redrawSnake( snake, last, true);
        clearInterval(timerid);
        return;
      }
      if (snake.hasEatenFruit()) {
        snake.doFeed(5);
        snakeVw.drawFruit(snake);
      }
      snakeVw.redrawSnake(snake, last, false);
    }, delay);
  }

  return {
    play,
    setDelay,
  };
};
