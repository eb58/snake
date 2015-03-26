/* global _, smath, snake */

var snakegame = function (w, h) {
   "use strict";
   var
      delay = 150, // millisec
      pause = false,
      vec = {dx: -1, dy: 0},
      snak = snake(w, h, 10),
      fruit = setFruit(),
      view = snakeview(w, h);

   function setFruit() {
      while (true) {
         fruit = smath.randomPoint(smath.rect(1, 1, w - 1, h - 1));
         if (!snak.hasCollisionPoint(fruit)) return fruit;
      }
   }

   function togglePause() {
      pause = !pause;
   }

   function setDelay(ms) {
      delay = ms;
   }

   function setDirection(dx, dy) {
      return function () {
         pause = false;
         if (vec.dx !== 0 && dx === -vec.dx) return;
         if (vec.dy !== 0 && dy === -vec.dy) return;
         vec = {dx: dx, dy: dy};
      };
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
            view.draw(snak);
            view.drawFruit(fruit);
            snak.update(vec);
            if (snak.hasCollision()) {
               view.draw(snak, true);
               clearInterval(timerid);
               return;
            }
            if (snak.hasEaten(fruit)) {
               snak.doFeed(5);
               fruit = setFruit();
            }
            view.draw(snak);
         },
         delay);
   }
   // API 
   return {
      play: play,
      setDelay: setDelay
   };
};