const r = require("raylib");
const d = require("./detector.js");
const p = require("./particles.js");

let s1 = {};
let s2 = {};
let s3 = {};

let p1 = {};
let p2 = {};
let p3 = {};

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const w = {
        width: 700,
        height: 500,
        FPS: 60,
    };

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(w.width, w.height, "Particle Detector");
    r.SetTargetFPS(w.FPS);

    s1 = d.createDetector(0, 0, 40, w.height, w.width / 2, 0, 1, "x");
    s2 = d.createDetector(
        w.width / 2,
        0,
        40,
        w.height,
        w.width,
        w.width / 2,
        3,
        "x",
    );
    s3 = d.createDetector(0, 0, w.width, 40, w.height, 0, 2, "y");

    p1 = p.createParticle(260, 0, 90, w.height, "x");
    p2 = p.createParticle(500, 0, 20, w.height, "x");
    p3 = p.createParticle(0, 200, w.width, 35, "y");
}

function update() {
    s1.velocity = d.updateX(s1);
    s2.velocity = d.updateX(s2);
    s3.velocity = d.updateY(s3);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    p.drawParticle(p1);
    p.drawParticle(p2);
    p.drawParticle(p3);

    d.drawDetector(s1, p1);
    d.drawDetector(s2, p2);
    d.drawDetector(s3, p3);

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
