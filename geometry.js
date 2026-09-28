const r = require("raylib");

const screenWidth = 700;
const screenHeight = 500;

const d1Width = 40;
const d2Width = 40;

let d1Start = 0;
let d2Start = screenWidth / 2;

let d1velocity = 1;
let d2velocity = 2;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screenWidth, screenHeight, "Rectangle");
    r.SetTargetFPS(60);
}

function isDetectorOutOfBounds(start, end) {
    return (start > end || start < 0);
}

function changeDirection(velocity) {
    velocity = -velocity;
}

function update() {
    if (isDetectorOutOfBounds(d1Start, screenWidth / 2)) changeDirection(d1velocity);
    d1Start += d1velocity;
    if (isDetectorOutOfBounds(d2Start, screenWidth)) changeDirection(d2velocity);
    d2Start += d2velocity;
}

function drawField(start, width, height, color) {
    r.DrawRectangle(start, 0, width, height, color);
}

function draw() {

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    const color = r.WHITE;
    drawField(d1Start, d1Width, screenHeight, color);
    drawField(d2Start, d2Width, screenHeight, color);

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