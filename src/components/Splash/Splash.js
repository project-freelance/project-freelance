import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Logo from './Logo/Logo';

import './Splash.css';

class Splash extends Component {
  render() {
    return (
      <div className="splash__content">
        <div className="splash__logoContainer">
          <div className="splash__loginContainer">
            <a href="http://localhost:3001/login">
              <Button
                variant="contained"
                size="medium"
                //   color="prmary
                // "
              >
                login
              </Button>
            </a>
          </div>
          <Logo />
        </div>
      </div>
    );
  }
}

export default Splash;
