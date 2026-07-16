function radToDeg(rad) {
    return (rad * 180) / Math.PI;
}
function randInt(start, end) {
    return Math.floor(Math.random() * (end - start)) + start;
}
function randChoice(arr) {
    return arr[randInt(0, arr.length)];
}
function lerp(a, b, pct) {
    return a + (b - a) * pct;
}
export default {
    radToDeg,
    randInt,
    randChoice,
    lerp
};
