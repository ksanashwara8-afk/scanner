const r = require("raylib");
const d = require("./detector.js");
const p = require("./particles.js");

function running() {
    return !r.WindowShouldClose();
}

function setup(world) {
    const w = {
        width: 700,
        height: 500,
        FPS: 60,
    };

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(w.width, w.height, "Particle Detector");
    r.SetTargetFPS(w.FPS);

    world.s1 = d.createDetector(0, 0, 40, w.height, w.width / 2, 0, 1, "x");
    world.s2 = d.createDetector(
        w.width / 2,
        0,
        40,
        w.height,
        w.width,
        w.width / 2,
        3,
        "x",
    );
    world.s3 = d.createDetector(0, 0, w.width, 40, w.height, 0, 2, "y");

    world.p1 = p.createParticle(260, 0, 90, w.height, "x");
    world.p2 = p.createParticle(500, 0, 20, w.height, "x");
    world.p3 = p.createParticle(0, 200, w.width, 35, "y");

    return world;
}

function update(world) {
    world.s1.velocity = d.updateX(world.s1);
    world.s2.velocity = d.updateX(world.s2);
    world.s3.velocity = d.updateY(world.s3);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    p.drawParticle(world.p1);
    p.drawParticle(world.p2);
    p.drawParticle(world.p3);

    d.drawDetector(world.s1, world.p1);
    d.drawDetector(world.s2, world.p2);
    d.drawDetector(world.s3, world.p3);

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
