import BezierDrawer from "./BezierDrawer.js";

let canvas = document.querySelector('canvas');
let bezier = new BezierDrawer(canvas, 2, 0.0005);
bezier.start();