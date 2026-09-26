const r = require("raylib");

const screenWidth = 700;
const screenHeight = 500;

let direction1 = 1;
let rectX1 = 0;

let direction2 = 1;
let rectX2 = screenWidth / 2;


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

    const halfWidth = screenWidth / 2;

    if (rectX1 + rectWidth >= halfWidth) direction1 = -1;
    if (rectX1 < 0) direction1 = 1;

    rectX1 = rectX1 + (speed1 * direction1);

    if (rectX2 + rectWidth >= screenWidth) direction2 = -1;
    if (rectX2 <= halfWidth) direction2 = 1;

    rectX2 = rectX2 + (speed2 * direction2);

}


function isScannerOverlapping(scannerX, rectWidth, pX, pWidth) {
    const scannerEnd = scannerX + rectWidth;
    const pEnd = pX + pWidth;
    return (scannerEnd >= pX && scannerX < pEnd);
}

function identifyParticle(scannerX, rectWidth, p1X, p1Width, p2X, p2Width) {
    const p1 = isScannerOverlapping(scannerX, rectWidth, p1X, p1Width);
    const p2 = isScannerOverlapping(scannerX, rectWidth, p2X, p2Width);

    return p1 || p2 ? r.RED : r.WHITE;
}

function draw() {
    const rectWidth = 40;
    const rectY = 0;

    const p1X = 250;
    const p1Width = 90;

    const p2X = 500;
    const p2Width = 20;

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    update(rectWidth);
    const color1 = identifyParticle(rectX1, rectWidth, p1X, p1Width, p2X, p2Width);
    const color2 = identifyParticle(rectX2, rectWidth, p1X, p1Width, p2X, p2Width);

    r.DrawRectangle(p1X, rectY, p1Width, screenHeight, r.SKYBLUE);
    r.DrawRectangle(p2X, rectY, p2Width, screenHeight, r.SKYBLUE);

    r.DrawRectangle(rectX1, rectY, rectWidth, screenHeight, color1);
    r.DrawRectangle(rectX2, rectY, rectWidth, screenHeight, color2);

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