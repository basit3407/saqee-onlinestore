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
    h1: {
      fontFamily: `"Ubuntu","Roboto","Helvetica","Arial",sans-serif`,
      fontSize: "4.5rem",
      fontWeight: 500,
    },
    h2: {
      fontFamily: `"Ubuntu","Roboto","Helvetica","Arial",sans-serif`,
      fontSize: "3.5rem",
      fontWeight: 500,
    },
    h4: {
      fontFamily: `"Ubuntu","Roboto","Helvetica","Arial",sans-serif`,
    },
  },
});

export default theme;
