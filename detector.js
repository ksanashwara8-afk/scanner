const r = require("raylib");

function isScannerOutOfBound(start, width, upper, lower) {
    return start + width === upper || start === lower;
}

function changeDirection(start, width, upper, lower, velocity) {
    return isScannerOutOfBound(start, width, upper, lower)
        ? -velocity
        : velocity;
}

function moveScanner(start, velocity) {
    return start + velocity;
}

function isScannerOverlapping(scannerStart, scannerWidth, pStart, pWidth) {
    const scannerEnd = scannerStart + scannerWidth;
    const pEnd = pStart + pWidth;

    return scannerEnd >= pStart && scannerStart < pEnd;
}

function chooseColor(start, pStart, pWidth, scannerWidth) {
    return isScannerOverlapping(start, scannerWidth, pStart, pWidth)
        ? r.RED
        : r.WHITE;
}

module.exports = {
    changeDirection,
    moveScanner,
    chooseColor,
};
