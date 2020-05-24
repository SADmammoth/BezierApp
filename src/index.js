import CurveDrawer from "./CurveDrawer.js";
import bezier from "./bezier";

let canvas = document.querySelector("canvas");

let curveDrawer = new CurveDrawer(canvas, 3, 0.001, bezier);
curveDrawer.start();
