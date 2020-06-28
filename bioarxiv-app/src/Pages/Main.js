import React, { Component } from "react";
import MainBar from "../Components/MainBar";
import { getTopPapers } from "../Util.js";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      papers: [],
    };
  }
  componentDidMount() {
    getTopPapers().then((topPapers) => {
      console.log(topPapers);
    });
  }

  render() {
    return (
      <div className="Main">
        <MainBar></MainBar>
      </div>
    );
  }
}

export default Main;
