class @Contour
    constryctor: (matrix) ->
        @matrix = matrix

class @Contour.Point2D
    constructor: (x, y, value) ->
        @x = x
        @y = y
        @value = value
    toString: () ->
        "Point2D(#{@x}, #{@y}, #{@value})"