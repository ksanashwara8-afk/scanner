const r = require("raylib");

function drawRange(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color);
}

function isDetected(sStart, sWidth, pStart, pWidth) {
    const sEnd = sStart + sWidth;
    const pEnd = pStart + pWidth;

    return sEnd >= pStart && sStart < pEnd;
}

function chooseColor(s, p) {
    if (s.axis === "x") {
        return isDetected(s.x, s.width, p.x, p.width) ? r.RED : r.WHITE;
    }
    return isDetected(s.y, s.height, p.y, p.height) ? r.RED : r.WHITE;
}

module.exports = {
    drawRange,
    chooseColor,
};
