QUnit.test "Contour.Point2Dのインスタンス生成", (assert) ->
    point = new Contour.Point2D(1, 2, 10)
    assert.equal point.x, 1, "Point2D(1, 2, 10) -> x = 1"
    assert.equal point.y, 2, "Point2D(1, 2, 10) -> y = 2"
    assert.equal point.value, 10, "Point2D(1, 2, 10) -> value = 10"