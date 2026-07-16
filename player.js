import globals from "./lib/globals.js";
import Particle from "./lib/particle.js";

export default class Player {
  constructor(y) {
    this.x = globals.RESOLUTION.w / 2;
    this.y = y;
    this.r = 30;
    this.barWidth = globals.RESOLUTION.w * 0.9;
    this.barHeight = this.r * 2;
    this.barStart = (globals.RESOLUTION.w - this.barWidth) / 2;
    this.barEnd = globals.RESOLUTION.w - this.barStart;
    this.speed = 400;
    this.direction = -1;
    this.color = "hotpink";
    this.active = true;
    this.particles = [];
  }
  update(dt) {
    this.x += this.speed * dt * this.direction;
    if (this.x <= this.barStart + this.r) {
      this.x = this.barStart + this.r;
      this.direction *= -1;
    }
    if (this.x >= this.barEnd - this.r) {
      this.x = this.barEnd - this.r;
      this.direction *= -1;
    }

    for (let particle of this.particles) {
      particle.update(dt);
    }
    this.particles = this.particles.filter((p) => p.active);
    if (!this.particles.length && !this.active) {
      // trigger game over
      console.log("game over");
    }
  }

  draw(ctx) {
    ctx.fillStyle = "lightgrey";
    ctx.roundRect(
      this.barStart,
      this.y - this.r,
      this.barWidth,
      this.barHeight,
      this.r,
    );
    ctx.fill();

    if (this.active) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    for (let particle of this.particles) {
      particle.draw(ctx);
    }
  }

  die() {
    this.active = false;
    this.particles = [];
    for (let i = 0; i < 20; i++) {
      let dx = Math.random() * 200 + 100;
      let dy = Math.random() * 200 + 100;
      if (Math.random() < 0.5) dx *= -1;
      if (Math.random() < 0.5) dy *= -1;
      this.particles.push(
        new Particle(
          this.x + this.r,
          this.y + this.r,
          dx,
          dy,
          Math.random() * 10 + 5,
          this.color,
        ),
      );
    }
  }
}
