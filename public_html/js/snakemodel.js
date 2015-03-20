var snakemodel = (function () {
   "use strict";
   var w = 400;
   var h = 300;
   var vec = {dx: 0, dy: 0};
   var snake = _.range(20).map(function (v) {
      return {x: v+10, y: 10};
   });
  
   function init() {
   }

   function dump() {
      var s = '';
      snake.forEach(function (v) {
         s += '(' + v.x + ',' + v.y + '), ';
      });
      console.log( s );
   }
   
   function setDirection(dx, dy) {
      return function () {
         vec = {dx: dx, dy: dy};
      };
   }

   function update() {
      var head = _.first(snake);
      snake = [].concat( [{x:head.x+vec.dx, y:head.y+vec.dy}], _.initial(snake))
      //snake = snake.map( function(v){ return {x:v.x+vec.dx,y:v.y+vec.dy}; } );
   }

   function play() {
      update();
      dump();
      setTimeout( play, 1000);
   }
   // API 
   return {
      init: init,
      up: setDirection(0, -1),
      down: setDirection(0, +1),
      left: setDirection(-1, 0),
      right: setDirection(+1, 0),
      play: play,
      dump: dump
   };
}());