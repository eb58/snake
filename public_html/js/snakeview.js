/* global Raphael */

var snakeview = function (w, h) {
   var scale = 10;
   var col = {
      background: '#aaa',
      backgroundFrame: '#000',
      snake: '#800',
      snakehit: '#f00',
      fruit: '#0f0'
   };
   var paper = Raphael(10, 10, w * scale, h * scale);
   paper.rect(0, 0, w * scale, h * scale).attr({fill: col.background, stroke: col.backgroundFrame, 'stroke-width': 8});

   function draw(snake, hit) {
      var head = snake[0];
      var tail = snake[snake.length - 1];
      paper.circle(tail.x * scale, tail.y * scale, 4).attr({fill: col.background, stroke: col.background, 'stroke-width': 4});
      _.initial(snake).map(function (v) {
         paper.circle(v.x * scale, v.y * scale, 3).attr({fill: col.snake, stroke: col.snake, 'stroke-width': 3});
      });
      if (hit) {
         paper.circle(head.x * scale, head.y * scale, 3).attr({fill: col.snakehit, stroke: col.snakehit, 'stroke-width': 3});
      }
   }
   function drawFruit(fruit) {
      paper.circle(fruit.x * scale, fruit.y * scale, 3).attr({fill: col.fruit, stroke: col.fruit, 'stroke-width': 3});
   }

   return {
      draw: draw,
      drawFruit: drawFruit,
   };
};