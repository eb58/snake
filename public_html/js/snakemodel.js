/* global _, smath */

var snakemodel = function (w, h) {
   "use strict";
   var view = snakeview(w, h),
      field = smath.rect(0, 0, w, h),
      delay = 120, // millisec
      pause = false,
      vec = {dx: -1, dy: 0};

   var snake = function (len) {
      var start = smath.randomPoint(smath.rect(2, 2, w - 2 * len, h - 1));
      start.x += len;
      var ret = _.range(len).map(function (v) {
         return {x: v + start.x, y: start.y};
      });
      ret.feed = 0;
      return ret;
   }(10);

   function setFruit() {
      while (true) {
         fruit = smath.randomPoint(smath.rect(1, 1, w - 1, h - 1));
         if (!hasCollisionPoint(snake, fruit)) return fruit;
      }
   }
   var fruit = setFruit();

   function setDirection(dx, dy) {
      return function () {
         pause = false;
         if (vec.dx !== 0 && dx === -vec.dx) return;
         if (vec.dy !== 0 && dy === -vec.dy) return;
         vec = {dx: dx, dy: dy};
      };
   }

   function hasBorderCollision(snake) {
      return !smath.pointInRect(snake[0], field);
   }

   function hasCollisionPoint(snake, p) {
      return _.some(_.tail(snake), function (q) {
         return smath.sqrdist(p, q) === 0;
      });
   }

   function hasSelfCollision(snake) {
      return hasCollisionPoint(snake, snake[0]);
   }

   function hasCollision(snake) {
      return hasBorderCollision(snake) || hasSelfCollision(snake);
   }

   function hasEaten(snake, fruit) {
      return smath.sqrdist(snake[0], fruit) === 0;
   }

   function update() {
      var newhead = smath.point(snake[0].x + vec.dx, snake[0].y + vec.dy);
      if (snake.feed !== 0) {
         var feed = snake.feed - 1;
         snake = [newhead].concat(snake);
         snake.feed = feed;
      }
      else {
         snake = [newhead].concat(_.initial(snake));
         snake.feed = 0;
      }
   }

   function play() {
      var id = setInterval(
         function () {//view.draw(snake);
            if (pause) return;
            view.draw(snake);
            view.drawFruit(fruit);
            update();
            if (hasCollision(snake)) {
               view.draw(snake, true);
               clearInterval(id);
               return;
            }
            if (hasEaten(snake, fruit)) {
               snake.feed = 5;
               fruit = setFruit();
            }
            view.draw(snake);
         },
         delay);
   }
   // API 
   return {
      upup: setDirection(0, -1),
      down: setDirection(0, +1),
      left: setDirection(-1, 0),
      right: setDirection(+1, 0),
      play: play,
      togglePause: function () {
         pause = !pause;
      },
   };
};