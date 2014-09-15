(function() {
  QUnit.test("Contour.Point2Dのインスタンス生成", function(assert) {
    var point;
    point = new Contour.Point2D(1, 2, 10);
    assert.equal(point.x, 1, "Point2D(1, 2, 10) -> x = 1");
    assert.equal(point.y, 2, "Point2D(1, 2, 10) -> y = 2");
    return assert.equal(point.value, 10, "Point2D(1, 2, 10) -> value = 10");
  });

}).call(this);
