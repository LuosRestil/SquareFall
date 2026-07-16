import globals from "./lib/globals.js";
import Vec2 from "./lib/Vec2.js";
import Particle from "./lib/particle.js";

const collectibleColor = "red";
const enemyColor = "rgb(20, 20, 20)";

export default class Square {
  x;
  y = -50;
  size = 50;
  dx = 50;
  dy = 300;
  rotation = 0;
  rotationSpeed = 1;
  active = true;
  destroy = false;
  collectible;
  particles = [];
  elapsed = 0;
  particleSpawnRate = 0.1;

  constructor(collectible) {
    this.x = Math.random() * globals.RESOLUTION.w * 0.9;
    if (Math.random() < 0.5) this.rotationSpeed *= -1;
    this.startX = this.x;
    if (this.x > globals.RESOLUTION.w / 2) {
      this.dx *= -1;
    }
    this.collectible = collectible;
    this.color = collectible ? collectibleColor : enemyColor;
  }

  update(dt) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;
    this.rotation += this.rotationSpeed * dt;
    if (this.y > globals.RESOLUTION.h + this.size * 2) {
      this.destroy = true;
    }
    for (let particle of this.particles) {
      particle.update(dt);
    }
    this.particles = this.particles.filter((particle) => particle.active);
    if (!this.particles.length && !this.active) {
      this.destroy = true;
    }
    if (this.active) {
      this.elapsed += dt;
    }
    if (this.elapsed > this.particleSpawnRate) {
      this.elapsed -= this.particleSpawnRate;
      for (let i = 0; i < 3; i++) {
        this.particles.push(
          new Particle(
            this.x + Math.random() * this.size,
            this.y + (Math.random() * this.size) / 2,
            this.dx / 4,
            this.dy / 4,
            Math.random() * 8,
            this.color,
          ),
        );
      }
    }
  }

  draw(ctx) {
    if (this.active) {
      ctx.save();
      ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    }
    for (let particle of this.particles) {
      particle.draw(ctx);
    }
  }

  burst() {
    this.active = false;
    this.particles = [];
    for (let i = 0; i < 10; i++) {
      let dx = Math.random() * 200 + 100;
      let dy = Math.random() * 200 + 100;
      if (Math.random() < 0.5) dx *= -1;
      if (Math.random() < 0.5) dy *= -1;
      this.particles.push(
        new Particle(
          this.x + this.size / 2,
          this.y + this.size / 2,
          dx,
          dy,
          Math.random() * 10 + 5,
          this.color,
        ),
      );
    }
  }
}
