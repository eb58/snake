var smath = {
   sqr: function sqr(x) {
      return x * x;
   },
   sqrdist: function sqrdist(p, q) {
      var dx = p.x - q.x;
      var dy = p.y - q.y;
      return dx * dx + dy * dy;
   },
   dist: function dist(p, q) {
      return Math.sqrt(this.sqrdist(p, q));
   },
   point: function point(x, y) {
      return {x: x, y: y};
   },
   rect: function rect(x, y, w, h) {
      return {x: x, y: y, w: w, h: h};
   },
   pointInRect: function pointInRect(p, r) {
      return r.x < p.x && p.x < r.w && r.y < p.y && p.y < r.h;
   },
   randomPoint: function randomPoint(rect) {
      while (true) {
         var x = Math.floor(Math.random() * rect.w);
         var y = Math.floor(Math.random() * rect.h);
         var p = smath.point(x, y);
         if (smath.pointInRect(p, rect)) return p;
      }
   }
};

