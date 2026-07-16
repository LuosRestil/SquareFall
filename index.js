import ScreenManager from "./lib/ScreenManager.js";
import globals from "./lib/globals.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const screenManager = new ScreenManager(globals.RESOLUTION.w, globals.RESOLUTION.h, ctx);
screenManager.resize(canvas);

window.addEventListener("resize", () => {
  screenManager.resize(canvas);
});

let lastMs = 0;
let elapsed = 0;

loop(0);

function loop(ms) {
  requestAnimationFrame(loop);

  const dt = (ms - lastMs) / 1000;
  lastMs = ms;

  update(dt);
  draw();
}

function update(dt) {
  elapsed += dt;
}

function draw() {
  ctx.fillStyle = "lightgrey";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
