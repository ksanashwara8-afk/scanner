const r = require("raylib");

function isDetectorOutOfBound(start, width, upper, lower) {
    return start + width === upper || start === lower;
}

function changeDirection(start, width, upper, lower, velocity) {
    if (isDetectorOutOfBound(start, width, upper, lower)) return -velocity;
    return velocity;
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
    isDetectorOutOfBound,
    changeDirection,
    isScannerOverlapping,
    chooseColor,
};
