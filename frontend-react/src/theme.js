import { extendTheme } from "@chakra-ui/react";

const theme = {
  config: {
    intialColorMode: "dark",
    useSystemColorMode: false,
  },

  styles: {
    global: {
      body: {
        image:
          "url:https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tvinsider.com%2Fshow%2Fbreaking-bad%2F&psig=AOvVaw2JMuVOFI40X8foWV_acLVK&ust=1670277353325000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJj8hJX64PsCFQAAAAAdAAAAABAD",
        margin: 0,
        "font-family":
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif",
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
