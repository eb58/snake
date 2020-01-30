/* global _, smath, snake */
const snakegame = function (w, h) {
  let
     fruit,
     delay = 150, // millisec
     pause = false,
     vec = {dx: -1, dy: 0},
     snak = snake(w, h, 10),
     view = snakeview(w, h);

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
      const handlermap = {
        '32': togglePause, // space
        '37': setDirection(-1, 0), // right
        '38': setDirection(0, -1), // down
        '39': setDirection(+1, 0), // left
        '40': setDirection(0, +1) // up
      };
      const handler = handlermap[e.keyCode];
      if (handler !== undefined)
        handler();
    });
  }

  const play = id => {
    init(id);
    const timerid = setInterval( () => {
      if (pause)
        return;
      view.draw(snak);
      view.drawFruit(fruit);
      snak.update(vec);
      if (snak.hasCollision()) {
        view.draw(snak, true);
        clearInterval(timerid);
        return;
      }
      if (snak.hasEaten(fruit)) {
        snak.doFeed(1);
        fruit = setFruit();
      }
      view.draw(snak);
    },
    delay);
  }
  // API 
  return {
    play,
    setDelay,
  };
};
