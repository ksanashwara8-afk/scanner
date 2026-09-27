const r = require("raylib");

const screenWidth = 700;
const screenHeight = 500;

let direction1 = 1;
let direction2 = 1;
let direction3 = 1;

let rectX1 = 0;
let rectX2 = screenWidth / 2;
let rectY3 = 0;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const FPS = 60;
    r.InitWindow(screenWidth, screenHeight, "Rectangle");
    r.SetTargetFPS(FPS);
}

function update(rectWidth) {
    const speed1 = 1.6;
    const speed2 = 2.5;
    const speed3 = 2;

    const halfWidth = screenWidth / 2;

    if (rectX1 + rectWidth >= halfWidth) direction1 = -1;
    if (rectX1 < 0) direction1 = 1;

    rectX1 = rectX1 + (speed1 * direction1);

    if (rectX2 + rectWidth >= screenWidth) direction2 = -1;
    if (rectX2 <= halfWidth) direction2 = 1;

    rectX2 = rectX2 + (speed2 * direction2);

    if (rectY3 + rectWidth >= screenHeight) direction3 = -1;
    if (rectY3 < 0) direction3 = 1;

    rectY3 = rectY3 + (speed3 * direction3);

}

function isScannerOverlapping(scannerStart, scannerWidth, pStart, pWidth) {
    const scannerEnd = scannerStart + scannerWidth;
    const pEnd = pStart + pWidth;
    return (scannerEnd >= pStart && scannerStart < pEnd);
}

function draw() {
    const rectWidth = 40;
    const rectY = 0;

    const p1X = 250;
    const p1Width = 90;

    const p2X = 500;
    const p2Width = 20;

    const p3Y = 220;
    const p3Width = 35;

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    update(rectWidth);

    const color1 = isScannerOverlapping(rectX1, rectWidth, p1X, p1Width) ? r.RED : r.WHITE;
    const color2 = isScannerOverlapping(rectX2, rectWidth, p2X, p2Width) ? r.RED : r.WHITE;
    const color3 = isScannerOverlapping(rectY3, rectWidth, p3Y, p3Width) ? r.RED : r.WHITE;

    r.DrawRectangle(p1X, rectY, p1Width, screenHeight, r.SKYBLUE);
    r.DrawRectangle(p2X, rectY, p2Width, screenHeight, r.SKYBLUE);
    r.DrawRectangle(rectY, p3Y, screenWidth, p3Width, r.SKYBLUE);

    r.DrawRectangle(rectX1, rectY, rectWidth, screenHeight, color1);
    r.DrawRectangle(rectX2, rectY, rectWidth, screenHeight, color2);
    r.DrawRectangle(rectY, rectY3, screenWidth, rectWidth, color3);

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