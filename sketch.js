const r = require("raylib");
const d = require("./detector.js");
const s1 = require("./scanner1.js");
const s2 = require("./scanner2.js");
const s3 = require("./scanner3.js");
const w = require("./window.js");

const p1Start = 250;
const p1Width = 90;

const p2Start = 500;
const p2Width = 20;

const p3Start = 220;
const p3Width = 35;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(w.width, w.height, "Rectangle");
    r.SetTargetFPS(w.FPS);
}

function update() {
    s1.velocity = d.changeDirection(
        s1.start,
        s1.width,
        w.width / 2,
        0,
        s1.velocity,
    );

    s2.velocity = d.changeDirection(
        s2.start,
        s2.width,
        w.width,
        w.width / 2,
        s2.velocity,
    );

    s3.velocity = d.changeDirection(
        s3.start,
        s3.width,
        w.height,
        0,
        s3.velocity,
    );

    s1.start = d.moveScanner(s1.start, s1.velocity);
    s2.start = d.moveScanner(s2.start, s2.velocity);
    s3.start = d.moveScanner(s3.start, s3.velocity);
}

function drawRange(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    const color1 = d.chooseColor(s1.start, p1Start, p1Width, s1.width);
    const color2 = d.chooseColor(s2.start, p2Start, p2Width, s2.width);
    const color3 = d.chooseColor(s3.start, p3Start, p3Width, s3.width);

    drawRange(p1Start, 0, p1Width, w.height, r.SKYBLUE);
    drawRange(p2Start, 0, p2Width, w.height, r.SKYBLUE);
    drawRange(0, p3Start, w.width, p3Width, r.SKYBLUE);

    drawRange(s1.start, 0, s1.width, w.height, color1);
    drawRange(s2.start, 0, s2.width, w.height, color2);
    drawRange(0, s3.start, w.width, s3.width, color3);

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
