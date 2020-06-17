import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import MainBar from "../Components/MainBar";
import theme from "../theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, ThemeProvider, fade } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import { getUserData, sendFollowRequest } from "../Util.js";
import Button from "@material-ui/core/Button";
import {
  Container,
  Card,
  Paper,
  TextField,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Link,
  InputBase,
  Tabs,
  Tab,
} from "@material-ui/core";
import axios from "axios";

const classes = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: "lg",
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(1, 1, 1),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
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
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      about: "",
      followers: [],
      following: [],
      email: "",
      username: "",
      institution: "",
      followRequest: "",
    };
    this.followRequest = this.followRequest.bind(this);
    this.setFollowRequest = this.setFollowRequest.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const user = jwt_decode(token).identity;
    const userData = getUserData(user.username);
    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      institution: user.institution,
      email: user.email,
      followers: userData.followers,
      following: userData.following,
      toFollow: "",
    });
  }
  followRequest(event) {
    event.preventDefault();
    sendFollowRequest(this.state.toFollow);
  }

  setFollowRequest(event) {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <MainBar></MainBar>
        </div>
        <div>
          <Card>
            <Grid container>
              <Grid direction="row" item>
                <Grid container>
                  <Grid item sm>
                    <CardContent>
                      <Avatar className={classes.avatar}></Avatar>
                      <Typography gutterBottom variant="h5" component="h5">
                        {this.state.firstName} {this.state.lastName}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Institution: {this.state.institution}
                      </Typography>
                      <Typography variant="body2" component="p">
                        E-mail: {this.state.email}
                      </Typography>
                    </CardContent>
                  </Grid>
                  <Grid item sm>
                    <CardContent>
                      <Grid container>
                        <Grid item lg>
                          <Link href="#" variant="body2">
                            Followers:{" "}
                            {this.state.followers
                              ? this.state.followers.length
                              : 0}
                          </Link>
                        </Grid>
                        <Grid item lg>
                          <Link href="#" variant="body2">
                            Following:{" "}
                            {this.state.following
                              ? this.state.followers.length
                              : 0}
                          </Link>
                        </Grid>
                      </Grid>
                      <Typography gutterBottom variant="h6" component="h3">
                        About
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              <CardContent>
                <div className={classes.search}>
                  <SearchIcon className={classes.searchIcon} />
                  <InputBase
                    placeholder="Search…"
                    name="toFollow"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    onChange={(event) => this.setFollowRequest(event)}
                    inputProps={{ "aria-label": "search" }}
                  />
                  <Button
                    onClick={(event) => this.followRequest(event)}
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Request
                  </Button>
                </div>
              </CardContent>
            </Grid>
          </Card>
          <Card>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="action tabs example"
            >
              <Tab label="Following" />
              <Tab label="Followers" />
            </Tabs>
          </Card>
        </div>
      </ThemeProvider>
    );
  }
}
export default Account;
