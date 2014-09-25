# 等値線作成ライブラリ

## 概要
MarchingSquaresアルゴリズムを使って等値線を作るライブラリ。
サンプルはD3.jsを用いて描画していますが、非依存です。

勉強用に書いたのでオブジェクトの生成数が多く実用的ではありません。

## 使い方
    vat matrix = [
        [1, 1, 1],
        [1, 2, 1],
        [1, 1, 1]
    ];
    var contour = new Contour(matrix)
    vat contours = contour.getContours([1.5, 3])
    contours["1.5"] // -> [(Contour.Path)]
    contours["3"]    // -> []
