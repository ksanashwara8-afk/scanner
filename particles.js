const r = require("raylib");
const d = require("./detector.js");

function createParticle(x, y, width, height) {
    const particle = d.createRange(x, y, width, height);
    return particle;
}

function drawParticle(particle) {
    d.drawRange(particle, r.SKYBLUE);
}

module.exports = {
    createParticle,
    drawParticle,
};
