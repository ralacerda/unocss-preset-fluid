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
  /**
   * @default 600
   */
  minPortSize?: number;

  /**
   * @default 1400
   */
  maxPortSize?: number;

  /**
   * @default 1.2
   */
  minScale?: number;

  /**
   * @default 1.4
   */
  maxScale?: number;

  /**
   * @default 16
   */
  minSize?: number;

  /**
   * @default 22
   */
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

function getFluidSize(step: number, config: Required<PresetFluidOptions>) {
  const minFontSize = config.minSize * config.minScale ** step;
  const maxFontSize = config.maxSize * config.maxScale ** step;

  // this formula is based on:
  // https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/
  const v =
    (100 * (maxFontSize - minFontSize)) /
    (config.maxPortSize - config.minPortSize);
  const r =
    (maxFontSize * config.minPortSize - minFontSize * config.maxPortSize) /
    (config.minPortSize - config.maxPortSize) /
    16;

  return `clamp(${minFontSize / 16}rem, ${v}vw + ${r}rem, ${
    maxFontSize / 16
  }rem)`;
}
