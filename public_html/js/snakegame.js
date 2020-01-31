/* global _, smath, snake */
const snakegame = (w, h) => {
  const snak = snake(w, h, 10);
  const view = snakeview(w, h);

  let fruit;
  let delay = 150; // millisec
  let pause = false;
  let vec = {dx: -1, dy: 0};


  const setFruit = () => {
    while (true) {
      fruit = smath.randomPointInRect(smath.rect(1, 1, w - 1, h - 1));
      if (!snak.hasCollisionPoint(fruit))
        return fruit;
    }
  }

  const togglePause = () => pause = !pause;
  const setDelay = ms => delay = ms;
  const setDirection = (dx, dy) => () => {
      pause = false;
      if (vec.dx !== 0 && dx === -vec.dx)
        return;
      if (vec.dy !== 0 && dy === -vec.dy)
        return;
      vec = {dx, dy};
    };

  const init = id => {
    fruit = setFruit();
    $(id).keydown(e => {
      const noop = () => 0;
      const handlermap = {
        32: togglePause, // space
        37: setDirection(-1, 0), // right
        38: setDirection(0, -1), // down
        39: setDirection(+1, 0), // left
        40: setDirection(0, +1) // up
      };
      const handler = handlermap[e.keyCode] || noop;
      handler();
    });
  }

  const play = id => {
    init(id);
    view.drawSnake(snak.getArr());
    view.drawFruit(fruit);

    const timerid = setInterval(() => {
      if (pause)
        return;
      const oldArr = snak.update(vec);
      if (snak.hasCollision()) {
        view.redrawSnake(oldArr, snak.getArr(), true);
        clearInterval(timerid);
        return;
      }
      if (snak.hasEaten(fruit)) {
        snak.doFeed(5);
        fruit = setFruit();
        view.drawFruit(fruit);
      }
      view.redrawSnake(oldArr, snak.getArr(), false);
    }, delay);
  }
  // API 
  return {
    play,
    setDelay,
  };
};
