import { extendTheme } from "@chakra-ui/react";

const theme = {
  config: {
    useSystemColorMode: "false",
    intialColorMode: "dark",
  },

  styles: {
    global: {
      body: {
        margin: 0,
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
      },

      code: {
        "font-family":
          "source-code-pro, Menlo, Monaco, Consolas, 'Courier New',monospace",
      },
    },
  },
};

export default extendTheme(theme);
