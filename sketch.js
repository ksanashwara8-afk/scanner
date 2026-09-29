const r = require("raylib");
const d = require("./detector.js");
const s1 = require("./scanner1.js");
const s2 = require("./scanner2.js");
const s3 = require("./scanner3.js");
const w = require("./window.js");
const p = require("./particles.js");

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

    const color1 = d.chooseColor(s1.start, p.start1, p.width1, s1.width);
    const color2 = d.chooseColor(s2.start, p.start2, p.width2, s2.width);
    const color3 = d.chooseColor(s3.start, p.start3, p.width3, s3.width);

    drawRange(p.start1, p.end, p.width1, w.height, r.SKYBLUE);
    drawRange(p.start2, p.end, p.width2, w.height, r.SKYBLUE);
    drawRange(p.end, p.start3, w.width, p.width3, r.SKYBLUE);

    drawRange(s1.start, s1.end, s1.width, w.height, color1);
    drawRange(s2.start, s2.end, s2.width, w.height, color2);
    drawRange(s3.end, s3.start, w.width, s3.width, color3);

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
