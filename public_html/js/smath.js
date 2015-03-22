var smath = {
   sqr: function sqr(x) {
      return x * x;
   },
   sqrdist: function sqrdist(p, q) {
      return this.sqr(p.x - q.x) + this.sqr(p.y - q.y);
   },
   dist: function dist(p, q) {
      return Math.sqrt(this.sqrdist(p, q));
   },
   rect: function rect(x, y, w, h) {
      return {x: x, y: y, w: w, h: h};
   },
   pointInRect: function pointInRect(p, r) {
      return r.x < p.x && p.x < r.w && r.y < p.y && p.y < r.h;
   },
   point: function point(x, y) {
      return {x: x, y: y};
   },
   randomPoint: function randomPoint(r) {
      while (true) {
         var p = smath.point(Math.floor(Math.random() * r.w), Math.floor(Math.random() * r.h));
         if (smath.pointInRect(p, r)) return p;
      }
   }
};

