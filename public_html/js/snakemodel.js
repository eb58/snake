/* global _, smath */

var snakemodel = function (w, h) {
   "use strict";
   var view = snakeview(w, h),
      playground = smath.rect(0, 0, w, h),
      delay = 150, // millisec
      pause = false,
      vec = {dx: -1, dy: 0};
   var snake = initSnake(10);
   var fruit = setFruit();

   function initSnake(len) {
      var start = smath.randomPoint(smath.rect(2, 2, w - 2 * len, h - 1));
      start.x += len;
      var ret = _.range(len).map(function (v) {
         return {x: v + start.x, y: start.y};
      });
      ret.feed = 0;
      return ret;
   }
   ;

   function setFruit() {
      while (true) {
         fruit = smath.randomPoint(smath.rect(1, 1, w - 1, h - 1));
         if (!hasCollisionPoint(snake, fruit)) return fruit;
      }
   }

   function hasBorderCollision(snake) {
      return !smath.pointInRect(snake[0], playground);
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

   function updateSnake() {
      var newhead = smath.point(snake[0].x + vec.dx, snake[0].y + vec.dy);
      if (snake.feed !== 0 ) {
         var feed = snake.feed - 1;
         snake = [newhead].concat(snake);
         snake.feed =  feed;
      }
      else {
         snake = [newhead].concat(_.initial(snake));
         snake.feed = 0;
      }
   }

   function setDirection(dx, dy) {
      return function () {
         pause = false;
         if (vec.dx !== 0 && dx === -vec.dx) return;
         if (vec.dy !== 0 && dy === -vec.dy) return;
         vec = {dx: dx, dy: dy};
      };
   }

   function togglePause() {
      pause = !pause;
   }

   function init(id) {
      $(id).keydown(function (e) {
         var handlermap = {
            '32': togglePause, // space
            '37': setDirection(-1, 0), // right
            '38': setDirection(0, -1), // down
            '39': setDirection(+1, 0), // left
            '40': setDirection(0, +1) // up
         };
         var handler = handlermap[e.keyCode];
         if (handler !== undefined) handler();
      });
   }

   function play(id) {
      init(id);
      var timerid = setInterval(
         function () {
            if (pause) return;
            view.draw(snake);
            view.drawFruit(fruit);
            updateSnake();
            if (hasCollision(snake)) {
               view.draw(snake, true);
               clearInterval(timerid);
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
      play: play,
   };
};