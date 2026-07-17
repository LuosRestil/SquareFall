import ScreenManager from "./lib/ScreenManager.js";
import globals from "./lib/globals.js";
import Player from "./player.js";
import Square from "./square.js";

const screenManager = new ScreenManager(
  globals.RESOLUTION.w,
  globals.RESOLUTION.h,
);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
screenManager.resize(canvas, ctx);

window.addEventListener("resize", () => {
  screenManager.resize(canvas, ctx);
});

let lastMs = 0;
let elapsed = 0;
let squaresSpawned = 0;
let spawnRate = 1.5;
let gameSpeed = 1.3;
let score = 0;

const player = new Player(globals.RESOLUTION.h / 2 + 50);
let squares = [];

document.addEventListener("pointerdown", () => {
  player.direction *= -1;
});

document.addEventListener("keydown", (evt) => {
  if (evt.repeat) return;
  player.direction *= -1;
});

document.addEventListener("mousemove", (evt)=> {
  globals.mousePos.x = evt.clientX;
  globals.mousePos.y = evt.clientY;
});

loop(0);

function loop(ms) {
  requestAnimationFrame(loop);

  let dt = (ms - lastMs) / 1000;
  dt *= gameSpeed;
  lastMs = ms;

  update(dt);
  draw();
}

function update(dt) {
  elapsed += dt;
  if (elapsed > spawnRate) {
    squaresSpawned += 1;
    let collectible = squaresSpawned % 5 === 0;
    squares.push(new Square(collectible));
    elapsed -= spawnRate;
  }

  player.update(dt);
  squares.forEach((square) => {
    square.update(dt);
    if (player.active && square.active) {
      let centerX = square.x + square.size / 2;
      let centerY = square.y + square.size / 2;
      let playerToSquare = { x: centerX - player.x, y: centerY - player.y };
      let dist = Math.sqrt(
        playerToSquare.x * playerToSquare.x +
          playerToSquare.y * playerToSquare.y,
      );
      let collided = dist < player.r * 2;
      if (collided) {
        if (square.collectible) {
          square.burst();
          score += 1;
          gameSpeed += 0.01;
        } else {
          player.die();
        }
      }
    }
  });
  squares = squares.filter((square) => !square.destroy);
}

function draw() {
  ctx.fillStyle = "whitesmoke";
  ctx.fillRect(0, 0, screenManager.viewWidth, screenManager.viewHeight);

  ctx.save();

  let camera = {
    x: (screenManager.viewWidth - screenManager.referenceWidth) / 2,
    y: (screenManager.viewHeight - screenManager.referenceHeight) / 2
  };
  ctx.translate(camera.x, camera.y);



  ctx.font = "128px sans-serif";
  ctx.fillStyle = "darkgrey";
  ctx.textAlign = "center";
  ctx.fillText(score, globals.RESOLUTION.w / 2, 400);

  player.draw(ctx);
  squares.forEach((square) => {
    square.draw(ctx);
  });

  // let mp = screenManager.screenToWorld(globals.mousePos, camera);
  // ctx.fillStyle = "blue";
  // ctx.beginPath();
  // ctx.arc(mp.x, mp.y, 30, 0, Math.PI * 2);
  // ctx.fill();

  ctx.restore();
}
