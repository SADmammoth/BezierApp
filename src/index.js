// import { divide, multiply, add } from "mathjs";
import CurveDrawer from "./CurveDrawer.js";
import bezier from "./bezier/index.js";
import bspline from "./bspline";
import "bootstrap/dist/css/bootstrap.css";

let canvas = document.querySelector("canvas");

const bezierPoints = [bezier, true, true];

const bezierClassic = [bezier, false];

const bsplinePoints = [bspline, true];

let curveDrawer = new CurveDrawer(canvas, 3, 0.001, ...bezierClassic);
curveDrawer.start();
