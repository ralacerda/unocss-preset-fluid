import type { Preset, PresetOptions } from "unocss";

const defaultOption: Required<PresetFluidOptions> = {
  minPortSize: 600,
  maxPortSize: 1400,
  minScale: 1.2,
  maxScale: 1.4,
  minSize: 16,
  maxSize: 22,
};

interface PresetFluidOptions extends PresetOptions {
  minPortSize?: number;
  maxPortSize?: number;
  minScale?: number;
  maxScale?: number;
  minSize?: number;
  maxSize?: number;
}

export function presetFluid(options: PresetFluidOptions = {}): Preset {
  const config = {
    ...defaultOption,
    ...options,
  };

  return {
    name: "unocss-preset-fluid",
    rules: [
      [
        /^fluid-(-?\d+)$/,
        ([, step]) => ({ "font-size": getFluidSize(Number(step), config) }),
      ],
    ],
  };
}

function getFluidSize(step: number, ...config: any) {
  const minFontSize = minSize * minScale ** step;
  const maxFontSize = maxSize * maxScale ** step;

  // this formula is based on:
  // https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/
  const v = (100 * (maxFontSize - minFontSize)) / (maxPortSize - minPortSize);
  const r =
    (maxFontSize * minPortSize - minFontSize * maxPortSize) /
    (minPortSize - maxPortSize) /
    16;

  return `clamp(${minFontSize / 16}rem, ${v}vw + ${r}rem, ${
    maxFontSize / 16
  }rem)`;
}
