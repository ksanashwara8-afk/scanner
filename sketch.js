const r = require("raylib");
const d = require("./detector.js");
const s1 = require("./scanner1.js");
const s2 = require("./scanner2.js");
const s3 = require("./scanner3.js");

const screenWidth = 700;
const screenHeight = 500;

const p1X = 250;
const p1Width = 90;

const p2X = 500;
const p2Width = 20;

const p3Y = 220;
const p3Width = 35;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screenWidth, screenHeight, "Rectangle");
    r.SetTargetFPS(60);
}

function update() {
    s1.start = s1.start + s1.velocity;
    s1.velocity = d.changeDirection(
        s1.start,
        s1.width,
        screenWidth / 2,
        0,
        s1.velocity,
    );

    s2.start = s2.start + s2.velocity;
    s2.velocity = d.changeDirection(
        s2.start,
        s2.width,
        screenWidth,
        screenWidth / 2,
        s2.velocity,
    );

    s3.start = s3.start + s3.velocity;
    s3.velocity = d.changeDirection(
        s3.start,
        s3.width,
        screenHeight,
        0,
        s3.velocity,
    );
}

function drawRange(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    const color1 = d.chooseColor(s1.start, p1X, p1Width, s1.width);
    const color2 = d.chooseColor(s2.start, p2X, p2Width, s2.width);
    const color3 = d.chooseColor(s3.start, p3Y, p3Width, s3.width);

    drawRange(p1X, 0, p1Width, screenHeight, r.SKYBLUE);
    drawRange(p2X, 0, p2Width, screenHeight, r.SKYBLUE);
    drawRange(0, p3Y, screenWidth, p3Width, r.SKYBLUE);

    drawRange(s1.start, 0, s1.width, screenHeight, color1);
    drawRange(s2.start, 0, s2.width, screenHeight, color2);
    drawRange(0, s3.start, screenWidth, s3.width, color3);

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
