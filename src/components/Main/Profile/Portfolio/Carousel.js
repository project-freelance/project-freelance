import React from "react";
import { Carousel } from "react-responsive-carousel";
import "./Carousel.css";

export default props => (
  <div className="carousel__container">
    <Carousel infiniteLoop stopOnHover autoPlay>
      <div>
        <img src={props.url1} alt="screenshot" />
        {props.link1 !== "null" ? (
          <a href={`http://${props.link1}`} className="legend">
            Click for Portfolio
          </a>
        ) : null}
      </div>
      <div>
        <img src={props.url2} alt="screenshot" />
        {props.link2 !== "null" ? (
          <a href={`http://${props.link2}`} className="legend">
            Click for Portfolio
          </a>
        ) : null}
      </div>

      <div>
        <img src={props.url3} alt="screenshot" />
        {props.link3 !== "null" ? (
          <a href={`http://${props.link3}`} className="legend">
            Click for Portfolio
          </a>
        ) : null}
      </div>

      {/* <img src={props.url3} alt="screenshot" />
      <div>
        <a href={`http://${props.link3}`}>Three</a>
        <p className="legend">{props.link3}</p>
      </div> */}
    </Carousel>
  </div>
);
