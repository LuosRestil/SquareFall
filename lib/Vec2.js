export default class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    copy() {
        return new Vec2(this.x, this.y);
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }
    static add(a, b) {
        return new Vec2(a.x + b.x, a.y + b.y);
    }
    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }
    static sub(a, b) {
        return new Vec2(a.x - b.x, a.y - b.y);
    }
    scale(scale) {
        this.x *= scale;
        this.y *= scale;
        return this;
    }
    static scale(v, scale) {
        return new Vec2(v.x * scale, v.y * scale);
    }
    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    setMag(mag) {
        this.normalize().scale(mag);
    }
    normalize() {
        this.scale(1 / this.mag());
        return this;
    }
    normalized() {
        let cpy = this.copy();
        cpy.normalize();
        return cpy;
    }
    toString() {
        return `Vec2(${this.x}, ${this.y})`;
    }
}
