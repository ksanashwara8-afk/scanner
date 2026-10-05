const rg = require("./range.js");

function createDetector(x, y, width, height, upper, lower, velocity, axis) {
    return (range = {
        x,
        y,
        width,
        height,
        upper,
        lower,
        velocity,
        axis,
    });
}

function drawDetector(s, p) {
    rg.drawRange(s.x, s.y, s.width, s.height, rg.chooseColor(s, p));
}

function isScannerOutOfBound(s) {
    if (s.axis === "x") return s.x + s.width >= s.upper || s.x <= s.lower;
    return s.y + s.height >= s.upper || s.y <= s.lower;
}

function changeDirection(scanner) {
    return isScannerOutOfBound(scanner) ? -scanner.velocity : scanner.velocity;
}

function moveScanner(start, velocity) {
    return start + velocity;
}

function updateX(scanner) {
    scanner.x = moveScanner(scanner.x, scanner.velocity);
    return changeDirection(scanner);
}

function updateY(scanner) {
    scanner.y = moveScanner(scanner.y, scanner.velocity);
    return changeDirection(scanner);
}

module.exports = {
    createDetector,
    drawDetector,
    updateX,
    updateY,
};
