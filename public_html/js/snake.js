/* global snakemodel */
var snake = (function (w,h) {
   "use strict";
   var m = snakemodel(w,h);
   return {
      play: m.play,
      handleEvents: function (e) {
         var handlermap = {
            '38': m.upup,
            '40': m.down,
            '37': m.left,
            '39': m.right,
            '32': m.togglePause // space
         };
         var h = handlermap[e.keyCode];
         if( h!==undefined ) h();
      }
   };
}(30,20));