import React from "react";
import { Carousel } from "react-responsive-carousel";

export default props => (
  <div>
    {/* {console.log(props)}
    {console.log(props.link)} */}
    <Carousel autoPlay>
      <a href={`http://${props.link}`}>
        <div>
          <img src={props.url1} />
          <p className="legend">Portfolio</p>
        </div>
      </a>
      <a href={`http://${props.link2}`}>
        <div>
          <img src={props.url2} />
          <div className="legend">{props.link2}</div>
        </div>
      </a>

<<<<<<< HEAD
      {/* <a href={`http://${props.link3}`}> */}
=======
      <img src={props.url3} />
>>>>>>> master
      <div>
        <a href={"http://www.google.com"} />
        <p className="legend">{props.link3}</p>
      </div>
      {/* </a> */}
    </Carousel>
  </div>
);
