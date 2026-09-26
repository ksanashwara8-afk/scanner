const r = require("raylib");
const s = require("./geometry");

const screenWidth = 400;
const screenHeight = 400;
const FPS = 60;
let direction = 1;

let rectX = 0;
let rectY = 0;

let rectWidth = 50;
let rectHeight = screenHeight;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(screenWidth, screenHeight, "Rectangle");
    r.SetTargetFPS(FPS);
}

function update() {
    let speed = 2;

    if (rectX >= screenWidth - rectWidth) direction = -1;

    if (rectX < 0) direction = 1;

    rectX = rectX + (speed * direction);

    return rectX;
}



function draw() {

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    r.DrawRectangle(rectX, rectY, rectWidth, rectHeight, r.WHITE);
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