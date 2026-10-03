const r = require("raylib");
const d = require("./detector.js");
const p = require("./particles.js");

const w = {
    width: 700,
    height: 500,
    FPS: 60,
};

let s1 = {};
let s2 = {};
let s3 = {};

let p1 = {};
let p2 = {};
let p3 = {};

let velocity1 = 1;
let velocity2 = 3;
let velocity3 = 2;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(w.width, w.height, "Particle Detector");
    r.SetTargetFPS(w.FPS);

    s1 = d.createRange(0, 0, 40, w.height);
    s2 = d.createRange(w.width / 2, 0, 40, w.height);
    s3 = d.createRange(0, 0, w.width, 40);

    p1 = p.createParticle(260, 0, 90, w.height);
    p2 = p.createParticle(500, 0, 20, w.height);
    p3 = p.createParticle(0, 200, w.width, 35);
}

function update() {
    velocity1 = d.updateX(s1, velocity1, w.width / 2, 0);
    velocity2 = d.updateX(s2, velocity2, w.width, w.width / 2);
    velocity3 = d.updateY(s3, velocity3, w.height, 0);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    p.drawParticle(p1);
    p.drawParticle(p2);
    p.drawParticle(p3);

    d.drawRange(s1, d.chooseColor(s1, p1, 1));
    d.drawRange(s2, d.chooseColor(s2, p2, 1));
    d.drawRange(s3, d.chooseColor(s3, p3, 0));

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
