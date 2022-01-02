import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "320px",
  md: "450px",
  lg: "768px",
  xl: "1200px",
});

const global = {
  "*": {
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
    fontFamily: ["Montserrat", "sans-serif"],
  },
};

export const customTheme = extendTheme({
  breakpoints,
  styles: {
    global,
  },
});
