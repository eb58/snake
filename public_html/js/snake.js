/* global snakegame, smath, _ */
const snake = (w, h, len) => {
   let feed = 0;
   let arr = [];

   function init() {
      const head = smath.randomPointInRect(smath.rect(w/4, 2, w - len, h - 2 ));
      arr = _.range(len).map(function (v) {
         return {x: v + head.x, y: head.y};
      });
   }

   function update(vec) {
      const head = arr[0];
      const newhead = smath.point(head.x + vec.dx, head.y + vec.dy);
      arr = [newhead].concat(feed === 0 ? arr.slice(0, arr.length - 1) : arr);
      feed = Math.max(0, feed - 1);
   }

   const doFeed = (n) => feed += n;
   const hasBorderCollision = () => !smath.pointInRect(arr[0], smath.rect(0, 0, w, h));
   const hasCollisionPoint = p => _.some(_.tail(arr), q => smath.sqrdist(p, q) === 0);
   const hasSelfCollision = () => hasCollisionPoint(arr[0]) 
   const hasCollision = ()  => hasBorderCollision() || hasSelfCollision();
   const hasEaten = fruit => smath.sqrdist(arr[0], fruit) === 0;

   init();

   return {
      init,
      doFeed,
      update,
      hasCollisionPoint,
      hasCollision,
      hasEaten,
      getArr: () => arr
   };
};
