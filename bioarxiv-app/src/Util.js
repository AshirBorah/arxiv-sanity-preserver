import React from "react";
import { Typography, Link } from "@material-ui/core";
import axios from "axios";

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export async function userLogin(user) {
  let logged_in = await axios
    .post("http://localhost:5000/login", {
      method: ["POST", "GET"],
      headers: { "Content-Type": "application/json" },
      widthCredentials: true,
      body: {
        username: user.username,
        password: user.password,
      },
    })
    .then((data) => {
      if (data.data.token) {
        return data.data.token;
      } else {
        alert("Invalid username or password.");
        return null;
      }
    });
  return logged_in;
}

export async function getCurrentUserData() {
  let userData = await axios.get("/currentuser").then((response) => {
    return response;
  });
  console.log("USER DATA : ", userData);
  return userData.data.user;
}

export async function getUserData(username) {
  const userData = await axios
    .get("/user", {
      params: {
        username: username,
      },
    })
    .then((response) => {
      if (response) {
        return response.data;
      } else {
        return null;
      }
    });
  return userData;
}

export async function logout() {
  localStorage.removeItem("token");
}

export async function sendFollowRequest(user) {
  console.log("USER", user);
  await axios
    .post("/requestfollow", {
      method: ["POST"],
      headers: { "Content-Type": "application/json" },
      widthCredentials: true,
      body: {
        toFollow: user,
      },
    })
    .then((response) => {
      if (response) {
        return response.data;
      } else {
        return null;
      }
    });
}

export async function getTopPapers() {
  const topPapers = await axios
    .get("/top", {
      params: {
        timefilter: "week",
        vfilter: "all",
      },
    })
    .then((response) => {
      if (response) {
        return response.data;
      } else {
        return null;
      }
    });
  console.log(topPapers);
  return topPapers;
}

export default Copyright;
