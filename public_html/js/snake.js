/* global snakemodel */
var snake = (function (w, h) {
   "use strict";
   var m = snakemodel(w, h);
   return {
      play: m.play,
   };
})(30, 20);