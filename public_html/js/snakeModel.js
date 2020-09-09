const snakeModel = (w, h, len) => {
  const range = n => [...Array(n).keys()];

  const head = smath.randomPointInRect(smath.rect(w / 4, 2, w - len, h - 2));

  let snake = range(len).map(v => smath.point(v + head.x, head.y));
  let fruit = generateFruit();
  let feed = 0;

  const generateFruit = () => {
    while (true) {
      const fruitPoint = smath.randomPointInRect(smath.rect(1, 1, w - 1, h - 1));
      if (!hasCollisionPoint(fruitPoint))
        return fruitPoint;
    }
  }

  const updateSnake = (vec) => {
    const oldSnake = [...snake];
    const head = snake[0];
    const newhead = smath.point(head.x + vec.dx, head.y + vec.dy);
    snake = [newhead].concat(feed === 0 ? snake.slice(0, snake.length - 1) : snake);
    feed = Math.max(0, feed - 1);
    return oldSnake;
  }

  const doFeed = (n) => { feed += n; fruit = generateFruit() }
  const hasBorderCollision = () => !smath.pointInRect(snake[0], smath.rect(0, 0, w, h));
  const hasCollisionPoint = (p) => _.some(_.tail(snake), q => smath.sqrdist(p, q) === 0);
  const hasSelfCollision = () => hasCollisionPoint(snake[0])
  const hasCollision = () => hasBorderCollision() || hasSelfCollision();
  const hasEatenFruit = () => smath.sqrdist(snake[0], fruit) === 0;

  init();

  return {
    doFeed,
    updateSnake,
    hasCollisionPoint,
    hasCollision,
    hasEatenFruit,
    getSnakeArr: () => snake,
    getFruit: () => fruit,
  };
};
