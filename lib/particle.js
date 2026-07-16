export default class Particle {
  constructor(x, y, dx, dy, r, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.r = r;
    this.decaySpeed = 20;
    this.fadeSpeed = 20;
    this.active = true;
  }

  update(dt) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;
    this.r -= this.decaySpeed * dt;
    if (this.r < 0) {
      this.active = false;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}
