export default class BezierDrawer {
  constructor(canvas, lineWidth, step) {
    this.anchorsCount = 0;
    this.directorsCount = 0;
    this.anchors = [{}, {}];
    this.directors = [{}, {}];
    this.isHolding = false;
    this.lineWidth = lineWidth;
    this.step = step;
    this.canvas = canvas;
    this.lastDirectonLine = null;
    this.lastBezier = null;

    this.canvasLeft = this.canvas.getBoundingClientRect().left;
    this.canvasTop = this.canvas.getBoundingClientRect().top;
  }

  start() {
    this.canvas.addEventListener('mousedown', () => { event.stopImmediatePropagation(); this.addAnchor(event.pageX - this.canvasLeft, event.pageY - this.canvasTop); this.directorsCount++; this.isHolding = true });
    this.canvas.addEventListener('mousemove', () => this.setDirecton(event.pageX - this.canvasLeft, event.pageY - this.canvasTop));
    this.canvas.addEventListener('mouseout', () => this.endBezier(event.pageX - this.canvasLeft, event.pageY - this.canvasTop));
    this.canvas.addEventListener('mouseup', () => { event.stopImmediatePropagation(); this.endBezier(event.pageX - this.canvasLeft, event.pageY - this.canvasTop); });
  }

  addAnchor(x, y) {
    this.anchors[this.anchorsCount] = { x, y };
    this.anchorsCount++;
    if (this.anchorsCount === 2) {
      this.draw();
    }
  }

  setDirecton(x, y) {
    if (this.isHolding) {
      this.directors[this.directorsCount - 1] = { x, y };
      let anchor = this.anchors[this.anchorsCount - 1];
      this.drawLine(2 * anchor.x - x, 2 * anchor.y - y, x, y);
      if (this.anchorsCount === 2) {
        this.draw();
      }
    }


  }

  draw() {
    if (this.lastDirectonLine) {
      let context = this.canvas.getContext('2d');
      context.save();
      context.globalCompositeOperation = "destination-out";
      context.lineWidth = 2;
      context.stroke(this.lastBezier);
      context.restore();

    }
    let path = new Path2D();
    if (this.directorsCount === 0 && this.anchorsCount === 2) {
      for (let t = 0; t <= 1; t += this.step) {
        let XY = this.bezierTWO(this.anchors[0].x, this.anchors[0].y, this.anchors[1].x, this.anchors[1].y, t);
        path.rect(XY.x, XY.y, this.lineWidth, this.lineWidth);
      }
      path.closePath();
      this.canvas.getContext('2d').fill(path);
    }
    if (this.anchorsCount === 2 && this.directorsCount === 1) {
      for (let t = 0; t <= 1; t += this.step) {

        let XY = this.bezierTHREE(this.anchors[0].x, this.anchors[0].y, this.directors[0].x, this.directors[0].y, this.anchors[1].x, this.anchors[1].y, t);
        path.rect(XY.x, XY.y, this.lineWidth, this.lineWidth);
      }
      path.closePath();
      this.canvas.getContext('2d').fill(path);
    }
    if (this.directors[0] !== {} && this.directors[1] !== {}
      && this.anchors[0] !== {} && this.anchors[1] !== {}) {
      console.log(this.directors);
      for (let t = 0; t <= 1; t += this.step) {
        let XY = this.bezierFOUR(this.anchors[0].x, this.anchors[0].y, this.directors[0].x, this.directors[0].y, this.directors[1].x, this.directors[1].y, this.anchors[1].x, this.anchors[1].y,
          t);

        path.rect(XY.x, XY.y, this.lineWidth, this.lineWidth);
      }
      path.closePath();
      this.canvas.getContext('2d').fill(path);
    }
    this.lastBezier = path;
  }

  bezierTWO(x1, y1, x2, y2, t) {
    return {
      x: (1 - t) * x1 + t * x2,
      y: (1 - t) * y1 + t * y2
    };
  }

  bezierTHREE(x1, y1, x2, y2, x3, y3, t) {
    return {
      x: (1 - t) ** 2 * x1 + 2 * (1 - t) * t * x2 + t ** 2 * x3,
      y: (1 - t) ** 2 * y1 + 2 * (1 - t) * t * y2 + t ** 2 * y3
    };
  }

  bezierFOUR(x1, y1, x2, y2, x3, y3, x4, y4, t) {
    return {
      x: (1 - t) ** 3 * x1 + 3 * (1 - t) ** 2 * t * x2 + 3 * (1 - t) * t ** 2 * x3 + t ** 3 * x4,
      y: (1 - t) ** 3 * y1 + 3 * (1 - t) ** 2 * t * y2 + 3 * (1 - t) * t ** 2 * y3 + t ** 3 * y4
    };
  }

  drawLine(x1, y1, x2, y2) {
    let context = this.canvas.getContext('2d');
    if (this.lastDirectonLine) {
      context.save();
      context.globalCompositeOperation = "destination-out";
      context.lineWidth = 6;
      context.stroke(this.lastDirectonLine);
      context.restore();

    }
    let path = new Path2D();
    path.moveTo(x1, y1);
    path.lineTo(x2, y2);
    path.closePath();
    context.stroke(path);
    this.lastDirectonLine = path;
  }


  endBezier() {
    this.lastDirectonLine = null;
    this.lastBezier = null;
    if (this.directorsCount === 1 && (this.directors[0].x === undefined)) {
      this.directorsCount--;
    }
    this.isHolding = false;
    if (this.anchorsCount === 2) {
      this.anchorsCount = 1;
      this.directorsCount = 1;
      this.anchors[0] = this.anchors[1];
      this.anchors[1] = {};
      this.director[0] = this.directors[1];
      this.directors[1] = {};
    }
  }
}



