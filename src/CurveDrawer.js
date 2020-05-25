export default class CurveDrawer {
  constructor(
    canvas,
    lineWidth,
    step,
    lineFunc,
    setPointsMode = false,
    hasDirectors = false
  ) {
    this.anchorsCount = 0;
    this.directorsCount = 0;
    this.anchors = [];
    this.directors = [];
    this.isHolding = false;
    this.lineWidth = lineWidth;
    this.step = step;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.lastDirectonLine = null;
    this.lastLine = null;

    this.setPointsMode = setPointsMode;
    this.hasDirectors = hasDirectors;

    this.savedLines = [];
    this.lineFunc = lineFunc;

    this.canvasLeft = this.canvas.getBoundingClientRect().left * 2;
    console.log(this.canvasLeft);
    this.canvasTop = this.canvas.getBoundingClientRect().top * 2;
  }

  getCoordinates(pageX, pageY) {
    let { clientWidth, clientHeight } = document.documentElement;
    let { width, height } = this.canvas;
    let widthCoef = width / clientWidth;
    let heightCoef = height / clientHeight;
    return {
      x: pageX * widthCoef,
      y: pageY * heightCoef,
    };
  }

  start() {
    if (!this.setPointsMode) {
      this.canvas.addEventListener("mousedown", () => {
        event.stopImmediatePropagation();
        let { x, y } = this.getCoordinates(event.pageX, event.pageY);
        this.addAnchor(x, y);
        this.directorsCount++;
        this.isHolding = true;
      });
      this.canvas.addEventListener("mousemove", () => {
        let { x, y } = this.getCoordinates(event.pageX, event.pageY);
        this.setDirection(x, y);
      });
      this.canvas.addEventListener("mouseout", () => event.preventDefault());
      this.canvas.addEventListener("mouseup", () => {
        event.stopImmediatePropagation();
        let { x, y } = this.getCoordinates(event.pageX, event.pageY);
        this.endLine(x, y);
      });
    } else {
      let path = new Path2D();
      this.canvas.addEventListener("mousedown", () => {
        let { x, y } = this.getCoordinates(event.pageX, event.pageY);

        path.ellipse(x, y, this.lineWidth, this.lineWidth / 2, 0, 0, 360);
        this.context.stroke(path);
        this.lastDirectonLine = path;
        this.addAnchor(x, y);
      });
    }
  }

  addAnchor(x, y) {
    this.anchors[this.anchorsCount] = { x, y };
    this.anchorsCount++;
    if (this.anchorsCount >= 2) {
      this.draw();
    }
  }

  setDirection(x, y) {
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
      this.context.fillStyle = "#ffffff";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.stroke(this.lastDirectonLine);
      this.savedLines.forEach((path) => {
        this.context.stroke(path);
      });
      this.context.fillStyle = "#000000";
    }
    let points = [...this.anchors, ...this.directors];

    if (this.hasDirectors && this.setPointsMode) {
      if (this.anchorsCount === 2) {
        points = [this.anchors[0], this.anchors[2]];
      } else if (this.anchorsCount === 3) {
        points = [this.anchors[0], this.anchors[2], this.anchors[1]];
      } else if (this.anchorsCount === 4) {
        points = [
          this.anchors[0],
          this.anchors[3],
          this.anchors[1],
          this.anchors[2],
        ];
      }
    }

    let path = new Path2D();
    for (let t = 0; t <= 1; t += this.step / this.anchorsCount) {
      let XY = this.lineFunc(t, ...points);
      if (t === 0) {
        path.ellipse(XY.x, XY.y, this.lineWidth * 2, this.lineWidth, 0, 0, 360);
      }
      if (t >= 1 - this.step) {
        path.ellipse(XY.x, XY.y, this.lineWidth * 2, this.lineWidth, 0, 0, 360);
      }
      path.rect(XY.x, XY.y, this.lineWidth, this.lineWidth);
    }
    path.closePath();
    this.context.fill(path);
    this.lastLine = path;
  }

  drawLine(x1, y1, x2, y2) {
    if (this.lastDirectonLine) {
      // this.context.save();
      this.context.fillStyle = "#ffffff";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = "#000000";
      this.context.stroke(this.lastDirectonLine);
      // this.context.restore();
    }
    let path = new Path2D();
    path.ellipse(x1, y1, this.lineWidth, this.lineWidth / 2, 0, 0, 360);
    path.ellipse(x2, y2, this.lineWidth, this.lineWidth / 2, 0, 0, 360);
    path.closePath();
    this.context.stroke(path);
    this.lastDirectonLine = path;
  }

  endLine() {
    if (this.lastLine !== null) {
      this.savedLines.push(this.lastLine);
    }
    this.lastDirectonLine = null;
    this.lastLine = null;
    if (this.directorsCount === 1 && this.directors[0].x === undefined) {
      this.directorsCount--;
    }
    this.isHolding = false;
    if (this.anchorsCount === 2) {
      this.anchorsCount = 1;
      this.directorsCount = 1;
      if (!this.setPointsMode) {
        this.anchors[0] = this.anchors[1];
        this.anchors[1] = {};

        let { x: ancX, y: ancY } = this.anchors[0];
        let { x, y } = this.directors[1];
        this.directors[0] = { x: 2 * ancX - x, y: 2 * ancY - y };
        this.directors[1] = {};
      } else {
        this.anchors = [this.anchors[this.anchors.length - 1]];
      }
    }
  }
}
