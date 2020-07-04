import React, { useState, useEffect } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import PaperPreview from "./PaperPreview.js";
import Grid from "@material-ui/core/Grid";
import theme from "../theme";
import clsx from "clsx";
import Container from "@material-ui/core/Container";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
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
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
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

export default function PaperPreviewList(props) {
  const classes = useStyles(theme);
  const [state, setState] = useState(props);
  useEffect(() => {
    setState(props);
  }, [props]);

  const paperCards = state.papers.map((paper) => {
    return (
      <Grid item xs={12} sm={6} md={4} key={state.papers.indexOf(paper)}>
        <PaperPreview paper={paper} />
      </Grid>
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <main
          className={clsx(classes.appBar, {
            [classes.appBarShift]: state.drawerOpen,
          })}
        >
          <div className={classes.drawerHeader} />
          <Grid
            container
            direction="row"
            spacing={0}
            justify="center"
            alignItems="flex-start"
          >
            {paperCards}
          </Grid>
        </main>
      </div>
    </ThemeProvider>
  );
}
