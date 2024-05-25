export class HSLA {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;

  constructor({ h, s, l, a }: { h: number; s: number; l: number; a: number }) {
    this.hue = h;
    this.saturation = s;
    this.lightness = l;
    this.alpha = a;
  }

  toString() {
    return `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
  }

  get value() {
    return this.toString();
  }
}
