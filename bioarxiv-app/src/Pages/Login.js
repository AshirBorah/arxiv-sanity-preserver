import React, { Component, useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Redirect } from "react-router-dom";
import "../routes";
import { useHistory } from "react-router-dom";
import theme from "../theme";
import { Card, Paper, CardContent, CardMedia } from "@material-ui/core";
import Cookies from "universal-cookie";
import Copyright, { userLogin } from "../Util.js";
const cookies = new Cookies();

const classes = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(event) {
    event.preventDefault();
    const logged = await userLogin(this.state);
    console.log("Is logged: ", logged);

    if (logged) {
      console.log("TOKEN: ", localStorage.getItem("token"));
      this.props.history.push(
        `/account/${this.state.username}${localStorage.getItem("token")}`
      );
    }
    console.log(logged);
  }

  handleChange(e) {
    const {
      target: { name, value },
    } = e;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Card component="main" maxWidth="xs">
            <CardContent className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  autoFocus
                  defaultValue={this.state.password}
                  onChange={(event) => this.handleChange(event)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                  defaultValue={this.state.password}
                  onChange={(event) => this.handleChange(event)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  onClick={(event) => this.handleClick(event)}
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Card>
        </Container>
      </ThemeProvider>
    );
  }
}
export default Login;
