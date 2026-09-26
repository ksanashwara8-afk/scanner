const r = require("raylib");
const s = require("./geometry");

const screenWidth = 700;
const screenHeight = 500;

let direction = 1;
let rectX = 0;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const FPS = 60;
    r.InitWindow(screenWidth, screenHeight, "Rectangle");
    r.SetTargetFPS(FPS);
}


function update(rectWidth) {
    const speed = 2;

    if (rectX >= screenWidth - rectWidth) direction = -1;
    if (rectX < 0) direction = 1;

    rectX = rectX + (speed * direction);

}


function isScannerOverlapping(start1, end1, start2, end2) {
    return (rectX >= start1 && rectX <= end1 || rectX >= start2 && rectX <= end2);

}

function identifyParticle(rectWidth, p1X, p1Width, p2X, p2Width) {
    const start1 = p1X - rectWidth;
    const end1 = p1Width + p1X;

    const start2 = p2X - rectWidth;
    const end2 = p2Width + p2X;

    const c = isScannerOverlapping(start1, end1, start2, end2) ? r.RED : r.WHITE;
    return c;
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
    color = identifyParticle(rectWidth, p1X, p1Width, p2X, p2Width);

    r.DrawRectangle(p1X, rectY, p1Width, screenHeight, r.SKYBLUE);
    r.DrawRectangle(p2X, rectY, p2Width, screenHeight, r.SKYBLUE);
    r.DrawRectangle(rectX, rectY, rectWidth, screenHeight, color);

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