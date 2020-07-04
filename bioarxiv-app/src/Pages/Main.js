import React, { Component } from "react";
import MainBar from "../Components/MainBar.js";
import FilterDrawer from "../Components/FilterDrawer.js";
import { getMostRecentPapers } from "../Util.js";
import PaperPreviewList from "../Components/PaperPreviewList.js";
import theme from "../theme";
import {
  makeStyles,
  useTheme,
  withStyles,
  ThemeProvider,
  fade,
  createMuiTheme,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import PaperPreview from "../Components/PaperPreview.js";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";

const drawerWidth = 240;
const classes = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  hide: {
    display: "none",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.dark,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    color: theme.palette.primary.dark,
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: theme.palette.primary.dark,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      papers: [],
      drawerOpen: false,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      drawerOpen: nextProps.drawerOpen,
      papers: nextProps.papers,
    });
  }

  componentDidMount() {
    getMostRecentPapers().then((topPapers) => {
      this.setState({ papers: topPapers });
    });
  }

  toggleDrawer(value) {
    this.setState({ drawerOpen: value });
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <MainBar
            position="fixed"
            open={this.state.drawerOpen}
            openDrawer={this.toggleDrawer}
          ></MainBar>
          <FilterDrawer
            className={classes.drawer}
            toggleOpen={this.toggleDrawer}
            open={this.state.drawerOpen}
          ></FilterDrawer>
          <PaperPreviewList
            papers={this.state.papers}
            drawerOpen={this.state.drawerOpen}
          ></PaperPreviewList>
        </div>
      </ThemeProvider>
    );
  }
}

export default Main;
