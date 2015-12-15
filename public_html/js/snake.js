/* global snakegame, smath, _ */
var snake = function (w, h, len) {
   "use strict";
   var
      feed = 0,
      arr = [];

   function init() {
      var head = smath.randomPoint(smath.rect(w/4, 2, w - len, h - 2 ));
      arr = _.range(len).map(function (v) {
         return {x: v + head.x, y: head.y};
      });
   }

   function update(vec) {
      var head = arr[0];
      var newhead = smath.point(head.x + vec.dx, head.y + vec.dy);
      arr = [newhead].concat(feed === 0 ? arr.slice(0, arr.length - 1) : arr);
      feed = Math.max(0, feed - 1);
   }

   function doFeed(n) {
      feed += n;
   }

   function hasBorderCollision() {
      return !smath.pointInRect(arr[0], smath.rect(0, 0, w, h));
   }

   function hasCollisionPoint(p) {
      return _.some(_.tail(arr), function (q) {
         return smath.sqrdist(p, q) === 0;
      });
   }

   function hasSelfCollision() {
      return hasCollisionPoint(arr[0]);
   }

   function hasCollision() {
      return hasBorderCollision() || hasSelfCollision();
   }

   function hasEaten(fruit) {
      return smath.sqrdist(arr[0], fruit) === 0;
   }

   init();

   return {
      init: init,
      doFeed: doFeed,
      update: update,
      hasCollisionPoint: hasCollisionPoint,
      hasCollision: hasCollision,
      hasEaten: hasEaten,
      getArr: function () {
         return arr;
      }
   };
};