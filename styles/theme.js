import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#f7eb61",

      dark: "#ff4c68",

      light: red[100],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
    text: {
      secondary: "rgba(255,255,255,.5)",
    },
  },
});

export default theme;
