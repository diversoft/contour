class @Contour
    constructor: (matrix) ->
        @matrix = matrix

class @Contour.Point2D
    constructor: (x, y, value) ->
        @x = x
        @y = y
        @value = value
    toString: () ->
        "Point2D(#{@x}, #{@y}, #{@value})"

class @Contour.Side2D
    constructor: (point1, point2) ->
        @point1 = point1
        @point2 = point2
    internallyDividingPoint: (dividingValue) ->
        if (dividingValue > @point1.value && dividingValue > @point2.value)
            return null
        if (dividingValue < @point1.value && dividingValue < @point2.value)
            return null
        m = Math.abs(@point1.value - dividingValue)
        n = Math.abs(@point2.value - dividingValue)
        new Contour.Point2D(
            (n * @point1.x + m * @point2.x) / (m + n),
            (n * @point1.y + m * @point2.y) / (m + n),
            dividingValue
        )