import { createMuiTheme } from "@material-ui/core/styles";
import { red, pink } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#f7eb61",

      dark: "#ff4c68",

      contrastText: pink.A200,

      light: red[50],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
    text: {
      secondary: "#8f8f8f",
    },
  },
  typography: {
    fontFamily: `'Work Sans', sans-serif`,
    fontWeight: 400,
    h1: {
      fontFamily: `'Ultra', serif`,
      fontSize: "4.5rem",
    },
    h2: { fontFamily: `'Ultra', serif` },
    h3: { fontFamily: `'Ultra', serif` },
    h4: { fontFamily: `'Ultra', serif` },
    h5: { fontFamily: `'Ultra', serif` },
    h6: { fontFamily: `'Ultra', serif` },
  },
});

export default theme;
