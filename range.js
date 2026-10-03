const r = require("raylib");

function createRange(x, y, width, height) {
    const range = {
        x: x,
        y: y,
        width: width,
        height: height,
    };
    return range;
}

function drawRange(range, color) {
    r.DrawRectangleRec(range, color);
}

module.exports = {
    createRange,
    drawRange,
};
