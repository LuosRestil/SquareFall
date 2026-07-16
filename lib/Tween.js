import Easings from "./Easings.js";
import utils from "./utils.js";
export default class Tween {
    constructor(obj, prop, target, duration, callback) {
        this.ease = Easings.linear;
        this.elapsed = 0;
        this.complete = false;
        this.obj = obj;
        this.prop = prop;
        this.startVal = obj[prop];
        this.target = target;
        this.duration = duration;
        this.callback = callback;
        return this;
    }
    withEasing(easingFunction) {
        this.ease = easingFunction;
        return this;
    }
    update(dt) {
        this.elapsed += dt;
        if (this.elapsed > this.duration) {
            this.elapsed = this.duration;
            this.complete = true;
            if (this.callback)
                this.callback();
        }
        this.obj[this.prop] = utils.lerp(this.startVal, this.target, this.ease(this.elapsed / this.duration));
    }
}
