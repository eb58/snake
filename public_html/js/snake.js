/* global snakemodel */
var snake = (function () {
   "use strict";
   var m = snakemodel;
   m.init();
   return {
      dump: m.dump,
      play: m.play,
      handleEvent: function (e) {
         var handlermap = {
            k38: m.up,
            k40: m.down,
            k37: m.left,
            k39: m.right
         };
         var h = handlermap['k' + e.keyCode];
         if( h!==undefined ) h();
      }
   };
}());