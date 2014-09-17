(function() {
  test("Contour.Point2Dのインスタンス生成", function(assert) {
    var point;
    point = new Contour.Point2D(1, 2, 10);
    assert.equal(point.x, 1, "Point2D(1, 2, 10) -> x = 1");
    assert.equal(point.y, 2, "Point2D(1, 2, 10) -> y = 2");
    assert.equal(point.value, 10, "Point2D(1, 2, 10) -> value = 10");
    assert.equal(point.toString(), "Point2D(1, 2, 10)", "toString -> Point2D(1, 2, 10)");
    return null;
  });

  test("Contour.Side2Dの内分点", function(assert) {
    var actual, expected, p1, p2, side;
    p1 = new Contour.Point2D(0, 0, 10);
    p2 = new Contour.Point2D(0, 1, 20);
    side = new Contour.Side2D(p1, p2);
    assert.equal(side.internallyDividingPoint(30), null, "外の点は内分されない");
    assert.equal(side.internallyDividingPoint(8), null, "外の点は内分されない");
    actual = side.internallyDividingPoint(15).toString();
    expected = new Contour.Point2D(0, 0.5, 15).toString();
    assert.equal(actual, expected, "valueと引数に応じて内分される");
    return null;
  });

  test("Contour.Square2D partialContour -> 存在しない場合", function(assert) {
    var actual, expected, square;
    square = new Contour.Square2D(new Contour.Point2D(0, 0, 1), new Contour.Point2D(1, 0, 2), new Contour.Point2D(0, 1, 3), new Contour.Point2D(1, 1, 4));
    expected = 0;
    actual = square.partialContour(5).length;
    assert.equal(actual, expected, "1,2,3,4 are less than 5");
    actual = square.partialContour(-1).length;
    assert.equal(actual, expected, "1,2,3,4 are greater than -1");
    return null;
  });

  test("Contour.Square2D partialContour -> 左上のみ分けられる場合", function(assert) {
    var actual, expected, square;
    square = new Contour.Square2D(new Contour.Point2D(0, 0, 1), new Contour.Point2D(1, 0, 2), new Contour.Point2D(0, 1, 3), new Contour.Point2D(1, 1, 4));
    expected = 1;
    actual = square.partialContour(1.5).length;
    assert.equal(actual, expected, "1,2,3,4 divided by 0.5 sepalated one line");
    return null;
  });

  test("Contour.Square2D partialContour -> 上下でのみ分けられる場合", function(assert) {
    var actual, expected, square;
    square = new Contour.Square2D(new Contour.Point2D(0, 0, 1), new Contour.Point2D(1, 0, 2), new Contour.Point2D(0, 1, 3), new Contour.Point2D(1, 1, 4));
    expected = 1;
    actual = square.partialContour(2.5).length;
    assert.equal(actual, expected, "1,2,3,4 divided by 0.5 sepalated one line");
    return null;
  });

  test("Contour.Square2D partialContour -> 左右でのみ分けられる場合", function(assert) {
    var actual, expected, square;
    square = new Contour.Square2D(new Contour.Point2D(0, 0, 1), new Contour.Point2D(1, 0, 2), new Contour.Point2D(0, 1, 1), new Contour.Point2D(1, 1, 2));
    expected = 1;
    actual = square.partialContour(1.5).length;
    assert.equal(actual, expected, "1,2,3,4 divided by 0.5 sepalated one line");
    return null;
  });

  test("Contour.Square2D partialContour -> クロスする場合", function(assert) {
    var actual, expected, square;
    square = new Contour.Square2D(new Contour.Point2D(0, 0, 1), new Contour.Point2D(1, 0, 2), new Contour.Point2D(0, 1, 2), new Contour.Point2D(1, 1, 1));
    expected = 2;
    actual = square.partialContour(1.5).length;
    assert.equal(actual, expected, "1,2,3,4 divided by 0.5 sepalated one line");
    return null;
  });

  test("Contour.new([[1,2],[3,4], [5,6]])", function(assert) {
    var actual, contour, matrix;
    matrix = [[1, 2], [3, 4], [5, 6]];
    contour = new Contour(matrix);
    actual = contour.matrix;
    assert.equal(actual.length, matrix.length, "行数が等しい");
    return assert.equal(actual[0].length, matrix[0].length, "列数が等しい");
  });

  test("Contour#getContours", function(assert) {
    var actual1, actual2, contour, contours, expected1, expected2, matrix;
    matrix = [[1, 1, 1], [1, 2, 1], [1, 2, 2]];
    contour = new Contour(matrix);
    contours = contour.getContours([1.5, 2.3]);
    actual1 = contours["1.5"].length;
    expected1 = 4;
    assert.equal(actual1, expected1, "contour 1.5 has 4 lines");
    actual2 = contours["2.3"].length;
    expected2 = 0;
    return assert.equal(actual2, expected2, "contour 2.3 has no lines");
  });

}).call(this);
