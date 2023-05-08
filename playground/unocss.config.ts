import { defineConfig, presetUno } from "unocss";
import { presetFluid } from "../src/index";

export default defineConfig({
  presets: [presetUno(), presetFluid()],
});

// const minViewPortSize = 600;
// const minScale = 1.2;
// const minBaseSize = 16;

// const maxViewPortSize = 1400;
// const maxScale = 1.5;
// const maxBaseSize = 24;

// function getFluidSize(step: number) {
//   const minFontSize = minBaseSize * minScale ** step;
//   console.log(minFontSize);
//   const maxFontSize = maxBaseSize * maxScale ** step;
//   console.log(maxFontSize);

//   // this formula is based on:
//   // https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/
//   const v =
//     (100 * (maxFontSize - minFontSize)) / (maxViewPortSize - minViewPortSize);
//   const r =
//     (maxFontSize * minViewPortSize - minFontSize * maxViewPortSize) /
//     (minViewPortSize - maxViewPortSize) /
//     16;

//   return `clamp(${minFontSize / 16}rem, ${v}vw + ${r}rem, ${
//     maxFontSize / 16
//   }rem)`;
// }
