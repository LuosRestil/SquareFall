var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Grid_cellSize;
import Rect from "./Rect.js";
class Grid {
    constructor(dim, cellSize, pos) {
        _Grid_cellSize.set(this, void 0);
        __classPrivateFieldSet(this, _Grid_cellSize, cellSize, "f");
        this.dim = dim;
        this.rect = new Rect(pos?.x ?? 0, pos?.y ?? 0, cellSize.x * dim.x, cellSize.y * dim.y);
        this.cells = Array.from({ length: dim.y }, () => Array(dim.x).fill(null));
    }
    update(dt) {
        for (let row of this.cells) {
            for (let cell of row) {
                cell && cell.update(dt);
            }
        }
    }
    draw(ctx) {
        // this.drawGrid(ctx);
        for (let row of this.cells) {
            for (let cell of row) {
                cell && cell.draw(ctx);
            }
        }
    }
    getCellSize() {
        return __classPrivateFieldGet(this, _Grid_cellSize, "f");
    }
    setCellSize(cellSize) {
        __classPrivateFieldSet(this, _Grid_cellSize, cellSize, "f");
        this.rect.w = cellSize.x * this.dim.x;
        this.rect.h = cellSize.y * this.dim.y;
    }
    drawGrid(ctx) {
        ctx.strokeStyle = "white";
        for (let i = 0; i < this.cells.length + 1; i++) {
            ctx.beginPath();
            ctx.moveTo(i * __classPrivateFieldGet(this, _Grid_cellSize, "f").x + this.rect.x, this.rect.y);
            ctx.lineTo(i * __classPrivateFieldGet(this, _Grid_cellSize, "f").x + this.rect.x, this.rect.y + this.rect.w);
            ctx.stroke();
            ctx.moveTo(this.rect.x, i * __classPrivateFieldGet(this, _Grid_cellSize, "f").y + this.rect.y);
            ctx.lineTo(this.rect.x + this.rect.w, i * __classPrivateFieldGet(this, _Grid_cellSize, "f").y + this.rect.y);
            ctx.stroke();
        }
    }
}
_Grid_cellSize = new WeakMap();
export default Grid;
