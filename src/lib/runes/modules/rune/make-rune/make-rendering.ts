import { HSLA } from "../../../HSLA";

export const makeRendering = () => ({
  colour: new HSLA({ h: 46, s: 100, l: 50, a: 0.7 }),
  radius: 15,
  shadowColour: new HSLA({ h: 46, s: 100, l: 50, a: 0.4 }),
  shadowBlur: 10,
  thickness: 15,
  vertices: [],
});
