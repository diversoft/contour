(function() {
  this.Contour = (function() {
    function Contour(matrix) {
      var i, j, point, r, row, value, _i, _j, _len, _len1;
      this.matrix = [];
      for (i = _i = 0, _len = matrix.length; _i < _len; i = ++_i) {
        row = matrix[i];
        r = [];
        for (j = _j = 0, _len1 = row.length; _j < _len1; j = ++_j) {
          value = row[j];
          point = new Contour.Point2D(i, j, value);
          r.push(point);
        }
        this.matrix.push(r);
      }
    }

    Contour.prototype.getContours = function(values) {
      var contours, i, j, key, path, square, value, _i, _j, _k, _l, _len, _len1, _ref, _ref1, _ref2;
      if (this.matrix.length < 2 || this.matrix[0].length < 2) {
        return null;
      }
      contours = {};
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        value = values[_i];
        key = value.toString();
        contours[key] = [];
        for (i = _j = 0, _ref = this.matrix.length - 2; 0 <= _ref ? _j <= _ref : _j >= _ref; i = 0 <= _ref ? ++_j : --_j) {
          for (j = _k = 0, _ref1 = this.matrix[0].length - 2; 0 <= _ref1 ? _k <= _ref1 : _k >= _ref1; j = 0 <= _ref1 ? ++_k : --_k) {
            square = new Contour.Square2D(this.matrix[i][j], this.matrix[i][j + 1], this.matrix[i + 1][j], this.matrix[i + 1][j + 1]);
            _ref2 = square.partialContour(value);
            for (_l = 0, _len1 = _ref2.length; _l < _len1; _l++) {
              path = _ref2[_l];
              contours[key].push(path);
            }
          }
        }
      }
      console.log(contours);
      return contours;
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

  this.Contour.Square2D = (function() {
    function Square2D(leftTop, rightTop, leftBottom, rightBottom) {
      this.leftTop = leftTop;
      this.rightTop = rightTop;
      this.leftBottom = leftBottom;
      this.rightBottom = rightBottom;
      this.topSide = new Contour.Side2D(this.leftTop, this.rightTop);
      this.rightSide = new Contour.Side2D(this.rightTop, this.rightBottom);
      this.bottomSide = new Contour.Side2D(this.rightBottom, this.leftBottom);
      this.leftSide = new Contour.Side2D(this.leftBottom, this.leftTop);
    }

    Square2D.prototype.partialContour = function(dividingValue) {
      var internal, internals, side, sides, _i, _len;
      internals = [];
      sides = [this.topSide, this.bottomSide, this.leftSide, this.rightSide];
      for (_i = 0, _len = sides.length; _i < _len; _i++) {
        side = sides[_i];
        internal = side.internallyDividingPoint(dividingValue);
        if (internal) {
          internals.push(internal);
        }
      }
      if (internals.length === 0) {
        return [];
      }
      if (internals.length === 2) {
        return [new Contour.Path2D(internals[0], internals[1])];
      }
      if (internals.length === 4) {
        return [new Contour.Path2D(internals[0], internals[1]), new Contour.Path2D(internals[2], internals[3])];
      }
    };

    return Square2D;

  })();

  this.Contour.Path2D = (function() {
    function Path2D(start, end) {
      this.start = start;
      this.end = end;
    }

    Path2D.prototype.toString = function() {
      return "Path(" + this.start + ", " + this.end + ")";
    };

    return Path2D;

  })();

}).call(this);
