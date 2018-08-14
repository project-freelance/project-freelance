import React from "react";
import { Carousel } from "react-responsive-carousel";

export default props => (
  <div>
    {console.log(props)}
    <Carousel autoPlay>
      <div>
        <img src={props.url1} />
        <p className="legend">{props.link1}</p>
      </div>
      <div>
        <img src={props.url2} />
        <div className="legend">{props.link2}</div>
      </div>

      <div>
        <img src={props.url3} />
        <p className="legend">{props.link3}</p>
      </div>
    </Carousel>
  </div>
);
