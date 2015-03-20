var snakeview = function (m) { 
   var w = 250;
   var h = 300;
   paper = Raphael(20, 20, w, h );
   paper.rect(0, 0, 300,300).attr({fill: "#fff", stroke: "#000"});

   function drawSnake(m) {
   }

   return {
      drawModel: drawSnake
   };
};