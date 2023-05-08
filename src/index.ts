import type { Preset, PresetOptions } from "unocss";

interface PresetFluidOptions extends PresetOptions {
  portSize?: [number, number];
  scale?: [number, number];
  baseSize?: [number, number];
}

export function presetFluid(options: PresetFluidOptions = {}): Preset {
  options.portSize ??= [600, 1400];
  options.scale ??= [1.2, 1.25];
  options.baseSize ??= [16, 22];

  return {
    name: "unocss-preset-fluid",
    rules: [
      [
        /^fluid-(-?\d+)$/,
        ([, step]) => ({ "font-size": getFluidSize(Number(step), options) }),
      ],
    ],
  };
}

function getFluidSize(
  step: number,
  { portSize, scale, baseSize }: PresetFluidOptions
) {
  const minFontSize = baseSize[0] * scale[0] ** step;
  const maxFontSize = baseSize[1] * scale[1] ** step;

  // this formula is based on:
  // https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/
  const v = (100 * (maxFontSize - minFontSize)) / (portSize[1] - portSize[0]);
  const r =
    (maxFontSize * portSize[0] - minFontSize * portSize[1]) /
    (portSize[0] - portSize[1]) /
    16;

  return `clamp(${minFontSize / 16}rem, ${v}vw + ${r}rem, ${
    maxFontSize / 16
  }rem)`;
}
