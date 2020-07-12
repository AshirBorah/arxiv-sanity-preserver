import { createMuiTheme } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles";

const t = createMuiTheme({
  palette: {
    // common: {},
    type: "dark",
    primary: {
      main: "#001c28",
      light: "#294350",
      dark: "#000000",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#d1ffea",
      light: "#5beacb",
      dark: "#00866c",
      contrastText: "#000000",
    },
    // error: {},
    // warning: {},
    // info: {},
    // success: {},
    // grey: {},
    contrastThreshold: 3,
    tonalOffset: 0.5,
    // text: {
    //   primary: "#d1ffea",
    //   secondary: "#003056",
    // },
    background: {
      paper: "#001c28",
      default: "#000000",
    },
    transitions: {
      easing: {
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
        easeIn: "cubic-bezier(0.4, 0, 1, 1)",
        sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
      },
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
      zIndex: {
        mobileStepper: 1000,
        speedDial: 1050,
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500,
      },
      direction: "ltr",
      mixins: {
        toolbar: {
          minHeight: 56,
        },
      },
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
