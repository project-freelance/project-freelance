import React, { Component } from 'react';
import Carousel from './Carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url1: 'https://s3.amazonaws.com/freelancer-userprofilebucket/pug.jpeg',
      link1: 'pug1',
      url2: 'https://s3.amazonaws.com/freelancer-userprofilebucket/Pug1.jpeg',
      link2: 'pug2',
      url3: 'https://s3.amazonaws.com/freelancer-userprofilebucket/Pug3.jpg',
      link3: 'pug3'
    };
  }

  render() {
    let { url1, url2, url3, link1, link2, link3 } = this.state;
    return (
      <div>
        <Carousel
          url1={url1}
          url2={url2}
          url3={url3}
          link1={link1}
          link2={link2}
          link3={link3}
        />
      </div>
    );
  }
}

export default Portfolio;
