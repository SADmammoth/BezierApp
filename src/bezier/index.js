function bezierTWO({ x: x1, y: y1 }, { x: x2, y: y2 }, t) {
  function bezierTwo(p1, p2, t) {
    return (1 - t) * p1 + t * p2;
  }

  return {
    x: bezierTwo(x1, x2, t),
    y: bezierTwo(y1, y2, t),
  };
}

function bezierTHREE({ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 }, t) {
  function bezierThree(p1, p2, p3, t) {
    return (1 - t) ** 2 * p1 + 2 * (1 - t) * t * p2 + t ** 2 * p3;
  }

  return {
    x: bezierThree(x1, x2, x3, t),
    y: bezierThree(y1, y2, y3, t),
  };
}

function bezierFOUR(
  { x: x1, y: y1 },
  { x: x2, y: y2 },
  { x: x3, y: y3 },
  { x: x4, y: y4 },
  t
) {
  function bezierFour(p1, p2, p3, p4, t) {
    return (
      (1 - t) ** 3 * p1 +
      3 * (1 - t) ** 2 * t * p2 +
      3 * (1 - t) * t ** 2 * p3 +
      t ** 3 * p4
    );
  }

  return {
    x: bezierFour(x1, x2, x3, x4, t),
    y: bezierFour(y1, y2, y3, y4, t),
  };
}

function bezier(t, anchor1, anchor2, director1, director2) {
  if (!director2) {
    if (director1) {
      return bezierTHREE(anchor1, director1, anchor2, t);
    }
    return bezierTWO(anchor1, anchor2, t);
  }
  return bezierFOUR(anchor1, director1, director2, anchor2, t);
}

export default bezier;
