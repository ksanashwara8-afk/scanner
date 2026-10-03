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

function isScannerOutOfBound(start, width, upper, lower) {
    return start + width >= upper || start <= lower;
}

function changeDirection(start, width, upper, lower, velocity) {
    return isScannerOutOfBound(start, width, upper, lower)
        ? -velocity
        : velocity;
}

function moveScanner(start, velocity) {
    return start + velocity;
}

function updateX(s, velocity, upper, lower) {
    s.x = moveScanner(s.x, velocity);
    return changeDirection(s.x, s.width, upper, lower, velocity);
}

function updateY(s, velocity, upper, lower) {
    s.y = moveScanner(s.y, velocity);
    return changeDirection(s.y, s.height, upper, lower, velocity);
}

function isScannerOverlapping(sStart, sWidth, pStart, pWidth) {
    const sEnd = sStart + sWidth;
    const pEnd = pStart + pWidth;

    return sEnd >= pStart && sStart < pEnd;
}

function chooseColor(s, p, vertical) {
    if (vertical)
        return isScannerOverlapping(s.x, s.width, p.x, p.width)
            ? r.RED
            : r.WHITE;

    return isScannerOverlapping(s.y, s.height, p.y, p.height) ? r.RED : r.WHITE;
}

module.exports = {
    createRange,
    drawRange,
    updateX,
    updateY,
    chooseColor,
};
