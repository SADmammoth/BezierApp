function bsplineBase(t, degree, points, knots) {
  let n = points.length;

  if (degree < 1) {
    throw new Error("Degree must be at least 1");
  }
  if (degree > n - 1) {
    throw new Error("Degree must be less than or equal to point count - 1");
  }

  if (knots.length !== n + degree + 1) {
    throw new Error(`Knot vector length must be ${n + degree + 1}`);
  }

  let internalKnotsIndexes = [degree, knots.length - 1 - degree];
  let low = knots[internalKnotsIndexes[0]];
  let high = knots[internalKnotsIndexes[1]];

  if (t < low || t > high) {
    throw new Error(
      `Parameter 't' is own of range. Must be in [${low},${high}]`
    );
  }

  let m;
  for (m = internalKnotsIndexes[0]; m < internalKnotsIndexes[1]; m++) {
    if (t >= knots[m] && t <= knots[m + 1]) {
      break;
    }
  }

  let N = [];
  for (let i = 0; i < n; i++) {
    N[i] = points[i];
  }

  let coef;
  for (let j = 1; j <= degree + 1; j++) {
    for (let i = m; i > m - degree - 1 + j; i--) {
      coef = (t - knots[i]) / (knots[i + degree + 1 - j] - knots[i]);
      N[i] = (1 - coef) * N[i - 1] + coef * N[i];
    }
  }

  return N[m];
}

function bsplineCustom(t, degree, ...points) {
  if (points.length - 1 >= degree) {
    let knotLength = points.length + degree + 1;
    let knots = new Array(degree + 1).fill(0);
    let step = 1 / (knotLength - 2 + degree);
    for (let i = degree + 2; i <= knotLength - degree - 1; i++) {
      knots.push((i - degree + 1) * step);
    }
    knots.push(...new Array(degree + 1).fill(1));

    return {
      x: bsplineBase(
        t,
        degree,
        points.map((el) => el.x),
        knots
      ),
      y: bsplineBase(
        t,
        degree,
        points.map((el) => el.y),
        knots
      ),
    };
  }
  return { x: NaN, y: NaN };
}

function bspline(t, ...points) {
  return bsplineCustom(t, 2, ...points);
}

export default bspline;

export { bsplineCustom };
