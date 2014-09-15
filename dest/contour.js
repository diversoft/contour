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

    return Point2D;

  })();

}).call(this);
