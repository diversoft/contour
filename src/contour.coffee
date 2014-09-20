class @Contour
    constructor: (matrix) ->
        @matrix = []
        for row, i in matrix
            r = []
            for value, j in row
                point = new Contour.Point2D(i, j, value)
                r.push(point)
            @matrix.push(r)
    getContours: (values) ->
        if (@matrix.length < 2 || @matrix[0].length < 2)
            return null
        contours = {}
        for value in values
            key = value.toString()
            contours[key] = []
            for i in [0..(@matrix.length-2)]
                for j in [0..(@matrix[0].length-2)]
                    square = new Contour.Square2D(
                        @matrix[i][j],
                        @matrix[i][j+1],
                        @matrix[i+1][j],
                        @matrix[i+1][j+1]
                    )
                    for path in square.partialContour(value)
                        contours[key].push(path)
        contours

class @Contour.Point2D
    constructor: (x, y, value) ->
        @x = x
        @y = y
        @value = value
    row: () ->
        @x
    colmn: () ->
        @y
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

class @Contour.Square2D
    constructor: (leftTop, rightTop, leftBottom, rightBottom) ->
        @leftTop = leftTop
        @rightTop = rightTop
        @leftBottom = leftBottom
        @rightBottom = rightBottom
        @topSide = new Contour.Side2D(@leftTop, @rightTop)
        @rightSide = new Contour.Side2D(@rightTop, @rightBottom)
        @bottomSide = new Contour.Side2D(@rightBottom, @leftBottom)
        @leftSide = new Contour.Side2D(@leftBottom, @leftTop)
    partialContour: (dividingValue) ->
        internals = []
        sides = [@topSide, @bottomSide, @leftSide, @rightSide]
        for side in sides
            internal = side.internallyDividingPoint(dividingValue)
            if (internal)
                internals.push internal
        if (internals.length == 0)
            return []
        if (internals.length == 2)
            return [
                new Contour.Path2D(internals[0], internals[1])
            ]
        if (internals.length == 4)
            return [
                new Contour.Path2D(internals[0], internals[1])
                new Contour.Path2D(internals[2], internals[3])
            ]

class @Contour.Path2D
    constructor: (start, end) ->
        @start = start
        @end = end
    toString: () ->
        "Path(#{@start}, #{@end})"