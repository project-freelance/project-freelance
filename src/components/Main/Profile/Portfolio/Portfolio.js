import React, { Component } from 'react';
import Carousel from './Carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class Portfolio extends Component {
  render(props) {
    return (
      <div>
        <Carousel
          url1={this.props.url1}
          url2={this.props.url2}
          url3={this.props.url3}
          link1={this.props.link1}
          link2={this.props.link2}
          link3={this.props.link3}
        />
      </div>
    );
  }
}

export default Portfolio;
