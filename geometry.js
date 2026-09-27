const r = require("raylib");

const screenWidth = 700;
const screenHeight = 500;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const FPS = 60;
    r.InitWindow(screenWidth, screenHeight, "Rectangle");
    r.SetTargetFPS(FPS);
}

function scannerStartChange(scannerStart, scannerWidth, Width, speed, direction) {

    if (scannerStart + scannerWidth >= Width) direction = -1;
    if (scannerStart < 0) direction = 1;
    scannerStart = scannerStart + (speed * direction);

    return [scannerStart, direction];
}

function update(scannerWidth) {
    const speed1 = 1.6;
    const speed2 = 2.5;
    const speed3 = 2;

    let direction1 = 1;
    let direction2 = 1;
    let direction3 = 1;

    const halfWidth = screenWidth / 2;

    rectX1, direction1 = scannerStartChange(rectX1, scannerWidth, halfWidth, speed1, direction1);

    rectX2, direction2 = scannerStartChange(rectX2, scannerWidth, screenWidth, speed2, direction2);

    rectY3, direction3 = scannerStartChange(rectY3, scannerWidth, screenHeight, speed3, direction3);
    return [rectX1, rectX2, rectY3];
}

function isScannerOverlapping(scannerStart, scannerWidth, pStart, pWidth) {
    const scannerEnd = scannerStart + scannerWidth;
    const pEnd = pStart + pWidth;
    return (scannerEnd >= pStart && scannerStart < pEnd);
}

function draw() {

    let rectX1 = 0;
    let rectX2 = screenWidth / 2;
    let rectY3 = 0;

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

    [rectX1, rectX2, rectY3] = update(rectX1, rectWidth);
    [rectX1, rectX2, rectY3] = update(rectX2, rectWidth);
    [rectX1, rectX2, rectY3] = update(rectY3, rectWidth);

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