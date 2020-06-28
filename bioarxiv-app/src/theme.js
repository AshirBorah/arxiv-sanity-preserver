import { createMuiTheme } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles";

const t = createMuiTheme({
  palette: {
    // common: {},
    type: "light",
    primary: {
      main: "#003056",
      light: "#395983",
      dark: "#00062d",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#d1ffea",
      light: "#ffffff",
      dark: "9fccb8",
      contrastText: "#000000",
    },
    // error: {},
    // warning: {},
    // info: {},
    // success: {},
    // grey: {},
    contrastThreshold: 3,
    tonalOffset: 0.5,
    text: {
      primary: "#003056",
      secondary: "#395983",
      disabled: "#00062d",
    },
    divider: "rgba(3, 26, 38, 1)",
    background: {
      paper: "#d1ffea",
      default: "#000000",
    },
    // action: {},
  },
  typography: {},
  shape: {},
  transitions: {},
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
});

export default t;
