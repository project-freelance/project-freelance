import React, { Component } from "react";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import "./Logo.css";

class Logo extends Component {
  render() {
    return (
      <div className="logo__container">
        <div className="container">
          <div className="f" id="f-team1" />
          <div className="f" id="f-team2" />
          <div className="f" id="f-team3" />
          <div className="f" id="f-team4" />
        </div>
        <div className="logo__title">
          <h1 className="logo__title--Grow">Freelancer</h1>
        </div>

        {/* <div className="logo__about">
          <div className="logo__about__content">
            <h2>What is Freelancer??</h2>
            <p>
            Freelancer is a project-first social media platform showcasing the works of multi-faceted creatives where clients can hire for any and all needs at every price point.
            </p>
          </div>
        </div>
        <div className="logo__scroll">
          <p>Down</p>
          <div className="arrow__bounce">
            <ArrowDownward style={{ margin: "auto" }} />
          </div> */}
        {/* </div> */}
      </div>
    );
  }
}

export default Logo;
