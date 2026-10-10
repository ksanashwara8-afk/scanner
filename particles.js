const r = require("raylib");
const rg = require("./range.js");

function createParticle(x, y, width, height, axis) {
    return {
        x,
        y,
        width,
        height,
        axis,
    };
}

function drawParticle(p) {
    rg.drawRange(p.x, p.y, p.width, p.height, r.SKYBLUE);
}

module.exports = {
    createParticle,
    drawParticle,
};
