(function() {
  QUnit.test("Contour.Point2Dのインスタンス生成", function(assert) {
    var point;
    point = new Contour.Point2D(1, 2, 10);
    assert.equal(point.x, 1, "Point2D(1, 2, 10) -> x = 1");
    assert.equal(point.y, 2, "Point2D(1, 2, 10) -> y = 2");
    assert.equal(point.value, 10, "Point2D(1, 2, 10) -> value = 10");
    return assert.equal(point.toString(), "Point2D(1, 2, 10)", "toString -> Point2D(1, 2, 10)");
  });

  QUnit.test("Contour.Side2Dの内分点", function(assert) {
    var actual, expected, p1, p2, side;
    p1 = new Contour.Point2D(0, 0, 10);
    p2 = new Contour.Point2D(0, 1, 20);
    side = new Contour.Side2D(p1, p2);
    assert.equal(side.internallyDividingPoint(30), null, "外の点は内分されない");
    assert.equal(side.internallyDividingPoint(8), null, "外の点は内分されない");
    actual = side.internallyDividingPoint(15).toString();
    expected = new Contour.Point2D(0, 0.5, 15).toString();
    return assert.equal(actual, expected, "valueと引数に応じて内分される");
  });

}).call(this);
