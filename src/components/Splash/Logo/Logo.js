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
        <div className="logo__scroll">
          <p>Down</p>
          <div className="arrow__bounce">
            <ArrowDownward style={{ margin: "auto" }} />
          </div>
        </div>
        <div className="logo__about">
          <div className="logo__about__content">
            <h1>About Freelancer</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              pretium risus non metus tincidunt, ac rhoncus quam malesuada.
              Vivamus imperdiet urna leo, eu pharetra mi porta nec. Aenean
              convallis iaculis enim sed varius. In ultricies neque et
              sollicitudin feugiat. Mauris posuere tortor nisi, at tincidunt
              libero auctor vel. Nam pretium urna at erat lobortis, vitae
              hendrerit felis pellentesque. Fusce rhoncus mattis blandit.
              Vestibulum eu mi lobortis, porta sapien in, porta orci. Nulla
              dignissim est eu quam gravida mattis. Proin semper, nisi congue
              sollicitudin aliquam, sem est pulvinar turpis, ut maximus turpis
              nisi eu quam. Nullam vehicula aliquet vestibulum. In at tempus ex.
              Sed blandit lacus a mollis pharetra. Nullam bibendum rhoncus
              pretium. Donec tincidunt, dui eu convallis auctor, velit purus
              blandit est, eu aliquet enim orci non magna. Vestibulum sit amet
              felis quis quam ullamcorper scelerisque vel sed urna. Aliquam
              mattis dui in nisl congue, id porta arcu dignissim.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Logo;
