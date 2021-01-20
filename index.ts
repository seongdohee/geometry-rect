interface Point {
  x: number;
  y: number;
}

interface Rect extends Point{
  width: number;
  height: number;
}

export default class GeometryRect {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor({ x = 0, y = 0, width = 0, height = 0 }: Rect) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  center(targetRect: GeometryRect) {
    const { width, height } = targetRect;
    const x = Math.round(width / 2 - this.width / 2);
    const y = Math.round(height / 2 - this.height / 2);
    this.x = x;
    this.y = y;
  }

  contains(targetRect: GeometryRect): boolean {
    const { x, y, width, height } = targetRect;
    return this.x <= x && x + width <= this.x + this.width &&
           this.y <= y && y + height <= this.y + this.height;
  }

  restrict(targetRect: GeometryRect) {
    const { width, height } = targetRect;
    let x;
    let y;

    if (this.x >= 0) {
      x = 0;
    } else {
      x = this._restrict(this.width, this.x, width);
    }

    if (this.y >= 0) {
      y = 0;
    } else {
      y = this._restrict(this.height, this.y, height);
    }

    this.x = x;
    this.y = y;
  }

  private _restrict(size: number, position: number, targetSize: number) {
    const includedSize = size - toPositiveNumber(position);
    const outsideSize = toPositiveNumber(targetSize - includedSize);
    return Math.floor(targetSize >= includedSize ? (toPositiveNumber(position) - outsideSize) * -1 : position);
  }
}

function toPositiveNumber(number: number) {
  return number < 0 ? number * -1 : number;
}