const r = require("raylib");

const screenWidth = 700;
const screenHeight = 500;

let scanner1X = 0;
let scanner2X = screenWidth / 2;
let scanner3Y = 0;

const scannerWidth = 40;

const p1X = 250;
const p1Width = 90;

const p2X = 500;
const p2Width = 20;

const p3Y = 220;
const p3Width = 35;

let s1Velocity = 1;
let s2Velocity = 2;
let s3Velocity = 1;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screenWidth, screenHeight, "Rectangle");
    r.SetTargetFPS(60);
}

function isDetectorOutOfBound(start, width, upper, lower) {
    return start + width === upper || start === lower;
}

function changeDirection(start, width, upper, lower, velocity) {
    if (isDetectorOutOfBound(start, width, upper, lower)) {
        return -velocity;
    }
    return velocity;
}

function update() {
    scanner1X = scanner1X + s1Velocity;
    s1Velocity = changeDirection(
        scanner1X,
        scannerWidth,
        screenWidth / 2,
        0,
        s1Velocity,
    );

    scanner2X = scanner2X + s2Velocity;
    s2Velocity = changeDirection(
        scanner2X,
        scannerWidth,
        screenWidth,
        screenWidth / 2,
        s2Velocity,
    );

    scanner3Y = scanner3Y + s3Velocity;
    s3Velocity = changeDirection(
        scanner3Y,
        scannerWidth,
        screenHeight,
        0,
        s3Velocity,
    );
}
/*
function update() {
    const speed1 = 1.5;
    const speed2 = 2.5;
    const speed3 = 2;

    const halfWidth = screenWidth / 2;

    if (scanner1X + scannerWidth >= halfWidth) direction1 = -1;
    if (scanner1X < 0) direction1 = 1;

    scanner1X = scanner1X + (speed1 * direction1);

    if (scanner2X + scannerWidth >= screenWidth) direction2 = -1;
    if (scanner2X <= halfWidth) direction2 = 1;

    scanner2X = scanner2X + (speed2 * direction2);

    if (scanner3Y + scannerWidth >= screenHeight) direction3 = -1;
    if (scanner3Y < 0) direction3 = 1;

    scanner3Y = scanner3Y + (speed3 * direction3);

}
*/

function isScannerOverlapping(scannerStart, scannerWidth, pStart, pWidth) {
    const scannerEnd = scannerStart + scannerWidth;
    const pEnd = pStart + pWidth;
    return scannerEnd >= pStart && scannerStart < pEnd;
}

function drawField(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color);
}

function chooseColor(start, pStart, pWidth) {
    return isScannerOverlapping(start, scannerWidth, pStart, pWidth)
        ? r.RED
        : r.WHITE;
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    const color1 = chooseColor(scanner1X, p1X, p1Width);
    const color2 = chooseColor(scanner2X, p2X, p2Width);
    const color3 = chooseColor(scanner3Y, p3Y, p3Width);

    drawField(p1X, 0, p1Width, screenHeight, r.SKYBLUE);
    drawField(p2X, 0, p2Width, screenHeight, r.SKYBLUE);
    drawField(0, p3Y, screenWidth, p3Width, r.SKYBLUE);

    drawField(scanner1X, 0, scannerWidth, screenHeight, color1);
    drawField(scanner2X, 0, scannerWidth, screenHeight, color2);
    drawField(0, scanner3Y, screenWidth, scannerWidth, color3);

    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};
