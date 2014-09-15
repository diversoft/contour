(function() {
  this.Contour = (function() {
    function Contour() {}

    Contour.prototype.constryctor = function(matrix) {
      return this.matrix = matrix;
    };

    return Contour;

  })();

  this.Contour.Point2D = (function() {
    function Point2D(x, y, value) {
      this.x = x;
      this.y = y;
      this.value = value;
    }

    Point2D.prototype.toString = function() {
      return "Point2D(" + this.x + ", " + this.y + ", " + this.value + ")";
    };

    return Point2D;

  })();

}).call(this);
