function bsplineBase(t, degree, points, knots) {
  var n = points.length;

  if (degree < 1) {
    throw new Error("Degree must be at least 1 (linear)");
  }
  if (degree > n - 1) {
    throw new Error("Degree must be less than or equal to point count - 1");
  }

  if (knots.length !== n + degree + 1) {
    throw new Error(`Knot vector length must be ${n + degree + 1}`);
  }

  var domain = [degree, knots.length - 1 - degree];

  var low = knots[domain[0]];
  var high = knots[domain[1]];
  t = t * (high - low) + low;

  if (t < low || t > high) {
    throw new Error(
      `Parameter 't' out of bounds: is ${t}, must not (${low}, ${high})`
    );
  }

  let m;
  for (m = domain[0]; m < domain[1]; m++) {
    if (t >= knots[m] && t <= knots[m + 1]) {
      break;
    }
  }

  var N = [];
  for (let i = 0; i < n; i++) {
    N[i] = points[i];
  }

  var coef;
  for (let j = 1; j <= degree + 1; j++) {
    for (let i = m; i > m - degree - 1 + j; i--) {
      coef = (t - knots[i]) / (knots[i + degree + 1 - j] - knots[i]);
      N[i] = (1 - coef) * N[i - 1] + coef * N[i];
    }
  }

  return N[m];
}

function bspline(t, ...points) {
  let degree = 2;
  let knotLength = points.length + degree + 1;
  let knots = [0, 0, 0];
  let step = 2 / (knotLength - 5);
  for (let i = 4; i <= knotLength - 3; i++) {
    knots.push((i - 3) * step);
  }
  knots.push(2, 2, 2);

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

export default bspline;
