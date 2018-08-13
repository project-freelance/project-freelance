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
          <Logo />
        </div>
        <div className="splash__container">
          <div className="splash__imageOne">
            <div>
              <img src="https://s3.amazonaws.com/freelancer-userprofilebucket/pug.jpeg" />
              <p className="legend">image One</p>
            </div>
          </div>
          <div class="splash__imageTwo">
            <div>
              <img src="https://s3.amazonaws.com/freelancer-userprofilebucket/Pug1.jpeg" />
              <p className="legend">image Two</p>
            </div>
          </div>
          <div class="Splash__imageThree">
            <div>
              <img src="https://s3.amazonaws.com/freelancer-userprofilebucket/Pug3.jpg" />
              <p className="legend">image Three</p>
            </div>
          </div>
          <div class="splash__loginContainer">
            <div>
              <h1>Freelancer</h1>
            </div>
            <div>
              <p>
                Prow scuttle parrel provost Sail ho shrouds spirits boom
                mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow's
                nest nipperkin grog yardarm hempen halter furl. Swab barque
                interloper chantey doubloon starboard grog black jack gangway
                rutters. Deadlights jack lad schooner scallywag dance the hempen
                jig carouser broadside cable strike colors. Bring a spring upon
                her cable holystone blow the man down spanker Shiver me timbers
                to go on account lookout wherry doubloon chase. Belay yo-ho-ho
                keelhaul squiffy black spot yardarm spyglass sheet transom heave
                to. Trysail Sail ho Corsair red ensign hulk smartly boom jib rum
                gangway. Case shot Shiver me timbers gangplank crack Jennys tea
                cup ballast Blimey lee snow crow's nest rutters. Fluke jib
                scourge of the seven seas boatswain schooner gaff booty Jack Tar
                transom spirits.
              </p>
            </div>
            <Button
              variant="outlined"
              color="primary"
              href="http://localhost:3001/login"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;
