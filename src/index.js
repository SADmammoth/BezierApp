// import { divide, multiply, add } from "mathjs";
import CurveDrawer from "./CurveDrawer.js";
import bezier from "./bezier/index.js";
import bspline, { bsplineCustom } from "./bspline";
import "bootstrap/dist/css/bootstrap.css";

let canvas = document.querySelector("canvas");

const bezierPoints = [bezier, true, true];

const bezierClassic = [bezier, false];

const bsplinePoints = [bspline, true];

const customBsplinePoints = (degree) => [
  (t, ...points) => bsplineCustom(t, degree, ...points),
  true,
];

let curveDrawer;

(function () {
  document.getElementById("bezier").addEventListener("click", enterBezierMode);
  document
    .getElementById("bspline")
    .addEventListener("click", enterBsplineMode);
})();

function enterBezierMode() {
  if (curveDrawer) {
    curveDrawer.remove();
  }
  curveDrawer = new CurveDrawer(canvas, 3, 0.001, ...bezierClassic);
  curveDrawer.start();

  showAll("shows-on-bezier");
  hideAll("shows-on-bspline");

  document
    .getElementById("bezierpoints")
    .addEventListener("click", enterBezierPointsMode);
}

function enterBezierPointsMode(event) {
  console.log(event.target.checked);
  if (!event.target.checked) {
    enterBezierMode();
    return;
  }
  if (curveDrawer) {
    curveDrawer.remove();
  }
  curveDrawer = new CurveDrawer(canvas, 3, 0.001, ...bezierPoints);

  showAll("shows-on-bezier");
  hideAll("shows-on-bspline");
  curveDrawer.start();
}

function enterBsplineMode() {
  if (curveDrawer) {
    curveDrawer.remove();
  }
  curveDrawer = new CurveDrawer(canvas, 3, 0.001, ...bsplinePoints);
  curveDrawer.start();

  hideAll("shows-on-bezier");
  showAll("shows-on-bspline");

  document
    .getElementById("bsplinedegree")
    .addEventListener("change", enterCustomBsplineMode);
}

function enterCustomBsplineMode(event) {
  if (curveDrawer) {
    curveDrawer.remove();
  }
  curveDrawer = new CurveDrawer(
    canvas,
    3,
    0.001,
    ...customBsplinePoints(parseInt(event.target.value))
  );
  curveDrawer.start();

  hideAll("shows-on-bezier");
  showAll("shows-on-bspline");
}

function showAll(className) {
  [...document.getElementsByClassName(className)].forEach((el) =>
    el.classList.remove("hidden")
  );
}

function hideAll(className) {
  [...document.getElementsByClassName(className)].forEach((el) =>
    el.classList.add("hidden")
  );
}
