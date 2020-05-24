function bezierTWO({ x: x1, y: y1 }, { x: x2, y: y2 }, t) {
  return {
    x: (1 - t) * x1 + t * x2,
    y: (1 - t) * y1 + t * y2,
  };
}

function bezierTHREE({ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 }, t) {
  return {
    x: (1 - t) ** 2 * x1 + 2 * (1 - t) * t * x2 + t ** 2 * x3,
    y: (1 - t) ** 2 * y1 + 2 * (1 - t) * t * y2 + t ** 2 * y3,
  };
}

function bezierFOUR(
  { x: x1, y: y1 },
  { x: x2, y: y2 },
  { x: x3, y: y3 },
  { x: x4, y: y4 },
  t
) {
  return {
    x:
      (1 - t) ** 3 * x1 +
      3 * (1 - t) ** 2 * t * x2 +
      3 * (1 - t) * t ** 2 * x3 +
      t ** 3 * x4,
    y:
      (1 - t) ** 3 * y1 +
      3 * (1 - t) ** 2 * t * y2 +
      3 * (1 - t) * t ** 2 * y3 +
      t ** 3 * y4,
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
