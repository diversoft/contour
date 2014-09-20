(function() {
  var HEIGHT, HWIGHT_PER_POINT, OFFSET_BOTTOM, OFFSET_LEFT, OFFSET_RIGTH, OFFSET_TOP, WIDTH, WIDTH_PER_POINT, contour, line, matrix, points, svg;

  matrix = [[0, 1, 1, 3, 2], [1, 3, 6, 6, 3], [3, 7, 9, 7, 3], [2, 7, 8, 6, 2], [1, 2, 3, 4, 3]];

  contour = new Contour(matrix);


  /*
  D3.jsによる格子の描画
   */

  OFFSET_TOP = 20;

  OFFSET_BOTTOM = 20;

  OFFSET_LEFT = 20;

  OFFSET_RIGTH = 20;

  WIDTH = 500;

  WIDTH_PER_POINT = WIDTH / (matrix.length - 1);

  HEIGHT = 500;

  HWIGHT_PER_POINT = HEIGHT / (matrix[0].length - 1);

  svg = d3.select("#draw-space").append("svg");

  svg.attr({
    width: OFFSET_LEFT + WIDTH + OFFSET_RIGTH,
    height: OFFSET_TOP + HEIGHT + OFFSET_BOTTOM
  });

  points = [].concat.apply([], contour.matrix);

  svg.selectAll("circle").data(points).enter().append("circle").attr({
    cx: function(d) {
      return OFFSET_LEFT + d.colmn() * WIDTH_PER_POINT;
    },
    cy: function(d) {
      return OFFSET_TOP + d.row() * HWIGHT_PER_POINT;
    },
    r: "5px"
  });

  svg.selectAll("text").data(points).enter().append("text").text(function(d) {
    return d.value;
  }).attr({
    "x": function(d) {
      return OFFSET_LEFT + d.colmn() * WIDTH_PER_POINT + 4;
    },
    "y": function(d) {
      return OFFSET_TOP + d.row() * HWIGHT_PER_POINT - 4;
    },
    "size": 4
  });


  /*
  等値線の描画
   */

  line = d3.svg.line().x(function(d) {
    return OFFSET_LEFT + d.colmn() * WIDTH_PER_POINT;
  }).y(function(d) {
    return OFFSET_TOP + d.row() * HWIGHT_PER_POINT;
  });

  Contour.draw(matrix, [1, 2, 3, 4, 5, 6], function(path, value) {
    return svg.append("path").attr({
      "d": function() {
        return line([path.start, path.end]);
      },
      "stroke": function() {
        if (value > 4) {
          return "red";
        } else if (value > 2) {
          return "green";
        } else {
          return "blue";
        }
      }
    });
  });

}).call(this);
