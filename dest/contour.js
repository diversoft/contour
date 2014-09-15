(function() {
  this.Contour = (function() {
    function Contour(matrix) {
      this.matrix = matrix;
    }

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

  this.Contour.Side2D = (function() {
    function Side2D(point1, point2) {
      this.point1 = point1;
      this.point2 = point2;
    }

    Side2D.prototype.internallyDividingPoint = function(dividingValue) {
      var m, n;
      if (dividingValue > this.point1.value && dividingValue > this.point2.value) {
        return null;
      }
      if (dividingValue < this.point1.value && dividingValue < this.point2.value) {
        return null;
      }
      m = Math.abs(this.point1.value - dividingValue);
      n = Math.abs(this.point2.value - dividingValue);
      return new Contour.Point2D((n * this.point1.x + m * this.point2.x) / (m + n), (n * this.point1.y + m * this.point2.y) / (m + n), dividingValue);
    };

    return Side2D;

  })();

}).call(this);
