import { IS_BROWSER } from "fresh/runtime.ts";
import { Configuration, setup } from "twind";
export * from "twind";
import typography from "https://esm.sh/@twind/typography";
export const config: Configuration = {
  darkMode: "class",
  mode: "silent",
  plugins: {
    ...typography(),
  },
};
if (IS_BROWSER) setup(config);
