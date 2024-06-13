import {
  RUNE_RENDERING_SHADOW_BLUR,
  RUNE_RENDERING_THICKNESS,
} from "../../../config/values.js";
import { HSLA } from "../../../HSLA";

export const makeRendering = ({ vertices = [] } = {}) => ({
  colour: new HSLA({
    h: 197,
    s: 100,
    l: 50,
    a: 0.7,
  }),
  radius: RUNE_RENDERING_THICKNESS,
  shadowColour: new HSLA({
    h: 197,
    s: 100,
    l: 50,
    a: 0.7,
  }),
  shadowBlur: RUNE_RENDERING_SHADOW_BLUR,
  thickness: RUNE_RENDERING_THICKNESS,
  vertices,
});
