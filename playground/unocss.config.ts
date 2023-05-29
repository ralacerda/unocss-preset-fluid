import { defineConfig, presetUno } from "unocss";
import { presetFluid } from "../src/index";

export default defineConfig({
  presets: [presetUno(), presetFluid()],
});
