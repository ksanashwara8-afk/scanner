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

function update(rectWidth, blueX, blueWidth) {
    const speed = 2;

    if (rectX >= screenWidth - rectWidth) direction = -1;
    if (rectX < 0) direction = 1;

    rectX = rectX + (speed * direction);

    const particleStart = blueX - rectWidth;
    const particleEnd = blueWidth + blueX;
    const c = (rectX >= particleStart && rectX <= particleEnd) ? r.RED : r.WHITE;
    return c;

}

function draw() {
    const rectWidth = 40;
    const rectY = 0;

    const blueX = 250;
    const blueY = 0;
    const blueWidth = 90;

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    const co = update(rectWidth, blueX, blueWidth);
    r.DrawRectangle(blueX, blueY, blueWidth, screenHeight, r.SKYBLUE);
    r.DrawRectangle(rectX, rectY, rectWidth, screenHeight, co);

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