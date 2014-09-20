matrix = [
    [0, 1, 1, 3, 2],
    [1, 3, 6, 6, 3],
    [3, 7, 9, 7, 3],
    [2, 7, 8, 6, 2],
    [1, 2, 3, 4, 3]
]
contour = new Contour(matrix)

###
D3.jsによる格子の描画
###
OFFSET_TOP = 10
OFFSET_BOTTOM = 10
OFFSET_LEFT = 10
OFFSET_RIGTH = 10
WIDTH = 500
WIDTH_PER_POINT = WIDTH / (matrix.length - 1)
HEIGHT = 500
HWIGHT_PER_POINT = HEIGHT / (matrix[0].length - 1)
svg = d3.select("#draw-space").append("svg")
svg.attr(
    width: OFFSET_LEFT + WIDTH + OFFSET_RIGTH
    height: OFFSET_TOP + HEIGHT + OFFSET_BOTTOM
)
points = [].concat.apply([], contour.matrix)
svg.selectAll("circle")
    .data(points)
    .enter()
    .append("circle")
    .attr(
        cx: (d) -> (OFFSET_LEFT + d.colmn() * WIDTH_PER_POINT)
        cy: (d) -> (OFFSET_TOP + d.row() * HWIGHT_PER_POINT)
        r: "5px"
    )

###
等値線の描画
###
line = d3.svg.line()
    .x((d) -> OFFSET_LEFT + d.colmn() * WIDTH_PER_POINT)
    .y((d) -> OFFSET_TOP + d.row() * HWIGHT_PER_POINT)

Contour.draw matrix, [1, 2, 3, 4, 5, 6, 7], (path, value) ->
    svg.append("path")
        .attr(
            "d": () -> line([path.start, path.end])
            "stroke": () ->
                if (value > 4)
                    "red"
                else if (value > 2)
                    "green"
                else
                    "blue"
        )