import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFreelancerPosts } from '../../../../../ducks/freelancerReducer';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Moment from 'react-moment';
import '../FreelancerPostModal/FreelancerPostModal.css';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import Info from '@material-ui/icons/Info.js';
import Email from '@material-ui/icons/Email.js';
import AccountCircle from '@material-ui/icons/AccountCircle.js';
import CancelPresentation from '@material-ui/icons/CancelPresentation.js';

class FreelancerPostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  componentDidMount() {}
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        {/* Modal Open Button */}
        <Button
          style={{
            color: '#808080'
          }}
          onClick={this.handleClickOpen}
        >
          <Tooltip title="More Info">
            <Info />
          </Tooltip>
        </Button>
        <Dialog
          className="freelancerPostModal__container"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          contentstyle={{
            width: '70vh',
            maxWidth: '100%',
            height: '70vw',
            padding: '30px'
          }}
        >
          <DialogContent>
            <div>
              <div className="freelancerPostModal__content">
                <div className="freelancerPostModal__picCancel">
                  <div>
                    <img
                      className="freelancerPostModal__image"
                      src={this.props.pic}
                      alt="person"
                      style={{
                        width: '120px',
                        height: '120px'
                      }}
                    />
                  </div>
                  <div className="freelancerPostModal__buttonMoment">
                    <div className="freelancerPostModal__cancelButton">
                      <Tooltip title="Cancel">
                        <CancelPresentation onClick={this.handleClose} />
                      </Tooltip>
                    </div>
                    <div>
                      <Moment fromNow>{this.props.moment}</Moment>
                    </div>
                  </div>
                </div>
                <div className="freelancerPostModal__data">
                  <h2>{`${this.props.firstName} ${this.props.lastName}`}</h2>
                  <p>{this.props.specialty}</p>
                  <p>{this.props.title}</p>
                  <p>{this.props.body}</p>

                  <form>
                    <div className="freelancerPostModal__buttons">
                      <Link
                        to={`/main/profile/${this.props.postUserId}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Button variant="outlined" color="primary">
                          <Tooltip title="View My Profile">
                            <AccountCircle />
                          </Tooltip>
                        </Button>
                      </Link>

                      <Button
                        href={`mailto:${
                          this.props.email
                        }?subject=I'd like to offer you a position with... `}
                        variant="outlined"
                        color="primary"
                      >
                        <Tooltip title="Email This Freelancer">
                          <Email />
                        </Tooltip>
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    freelancerPosts: state.freelancerReducer.freelancerPosts
  };
}
export default connect(
  mapStateToProps,
  {
    getFreelancerPosts
  }
)(FreelancerPostModal);
