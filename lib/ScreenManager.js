export default class ScreenManager {
  constructor(width, height) {
    this.refererenceWidth = width;
    this.referenceHeight = height;
    this.dpr = window.devicePixelRatio || 1;
    this.scale = 1;
  }
  resize(canvas, ctx) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    this.scale = Math.min(
      screenWidth / this.refererenceWidth,
      screenHeight / this.referenceHeight,
    );

    canvas.style.width = `${screenWidth}px`;
    canvas.style.height = `${screenHeight}px`;

    canvas.width = Math.round(screenWidth * this.dpr);
    canvas.height = Math.round(screenHeight * this.dpr);

    // amount of logical space onscreen
    this.viewWidth = screenWidth / this.scale;
    this.viewHeight = screenHeight / this.scale;

    ctx.setTransform(this.scale * this.dpr, 0, 0, this.scale * this.dpr, 0, 0);
  }

  screenToWorld(pos, camera = {x: 0, y: 0}) {
    pos.x = pos.x / this.scale + camera.y;
    pos.y = pos.y / this.scale + camera.x;
    return pos;
  }
}
