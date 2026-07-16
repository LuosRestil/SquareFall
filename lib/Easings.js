const easings = {
    linear: (t) => t,
    inSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
    outSine: (t) => Math.sin((t * Math.PI) / 2),
    inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
    inQuad: (t) => t * t,
    outQuad: (t) => 1 - Math.pow(1 - t, 2),
    inOutQuad: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    inCubic: (t) => t * t * t,
    outCubic: (t) => 1 - Math.pow(1 - t, 3),
    inOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    inQuart: (t) => t * t * t * t,
    outQuart: (t) => 1 - Math.pow(1 - t, 4),
    inOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
    inQuint: (t) => t * t * t * t * t,
    outQuint: (t) => 1 - Math.pow(1 - t, 5),
    inOutQuint: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
    outBounce: (t) => {
        const n = 7.5625;
        const d = 2.75;
        if (t < 1 / d)
            return n * t * t;
        if (t < 2 / d)
            return n * (t -= 1.5 / d) * t + 0.75;
        if (t < 2.5 / d)
            return n * (t -= 2.25 / d) * t + 0.9375;
        return n * (t -= 2.625 / d) * t + 0.984375;
    },
    inBounce: (t) => 1 - easings.outBounce(1 - t),
    inOutBounce: (t) => t < 0.5
        ? (1 - easings.outBounce(1 - 2 * t)) / 2
        : (1 + easings.outBounce(2 * t - 1)) / 2,
    outElastic: (t) => {
        if (t === 0 || t === 1)
            return t;
        return (Math.pow(2, -10 * t) * Math.sin(((t * 10 - 0.75) * (2 * Math.PI)) / 3) + 1);
    },
    inElastic: (t) => {
        if (t === 0 || t === 1)
            return t;
        return (-Math.pow(2, 10 * t - 10) *
            Math.sin(((t * 10 - 10.75) * (2 * Math.PI)) / 3));
    },
    inOutElastic: (t) => {
        if (t === 0 || t === 1)
            return t;
        return t < 0.5
            ? -(Math.pow(2, 20 * t - 10) *
                Math.sin(((20 * t - 11.125) * (2 * Math.PI)) / 4.5)) / 2
            : (Math.pow(2, -20 * t + 10) *
                Math.sin(((20 * t - 11.125) * (2 * Math.PI)) / 4.5)) /
                2 +
                1;
    },
    outBack: (t) => {
        const c = 1.70158; // controls how far it overshoots — increase for more dramatic effect
        return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
    },
    inBack: (t) => {
        const c = 1.70158;
        return (c + 1) * t * t * t - c * t * t;
    },
    inOutBack: (t) => {
        const c = 1.70158 * 1.525;
        return t < 0.5
            ? (Math.pow(2 * t, 2) * ((c + 1) * 2 * t - c)) / 2
            : (Math.pow(2 * t - 2, 2) * ((c + 1) * (2 * t - 2) + c) + 2) / 2;
    },
    outExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    inExpo: (t) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
    inOutExpo: (t) => {
        if (t === 0 || t === 1)
            return t;
        return t < 0.5
            ? Math.pow(2, 20 * t - 10) / 2
            : (2 - Math.pow(2, -20 * t + 10)) / 2;
    },
    outCirc: (t) => Math.sqrt(1 - Math.pow(t - 1, 2)),
    inCirc: (t) => 1 - Math.sqrt(1 - t * t),
    inOutCirc: (t) => t < 0.5
        ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
        : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2,
};
export default { ...easings };
