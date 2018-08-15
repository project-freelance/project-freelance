import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getFreelancer,
  getFreelancerPosts
} from '../../../../../ducks/freelancerReducer';
import { getUser } from '../../../../../ducks/userReducer';
import { getUsers } from '../../../../../ducks/userReducer';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Moment from 'react-moment';
import '../FreelancerPostModal/FreelancerPostModal.css';
import { Link } from 'react-router-dom';
class FreelancerPostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  componentDidMount() {
    this.props.getFreelancer(this.props.userId);
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSpecialtyChange = specialty => event => {
    this.setState({
      [specialty]: event.target.value
    });
  };

  render() {
    // console.log(this.props.userId);

    const localUserId = this.props && this.props.userId;
    const postId = this.props && this.props.postId;

    let matchUser = this.props.users.find(user => user.id === localUserId);
    let matchPost = this.props.freelancerPosts.find(post => post.id === postId);

    return (
      <div>
        {/* Modal Open Button */}
        <Button onClick={this.handleClickOpen}>More Info</Button>

        <Dialog
          className="freelancerPostModal__container"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          contentStyle={{
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
                      src={matchUser && matchUser.profile_image}
                      alt="person"
                      style={{
                        width: '120px',
                        height: '120px'
                      }}
                    />
                  </div>
                  <div className="freelancerPostModal__buttonMoment">
                    <div>
                      <Button
                        style={{
                          backgroundColor: '#FF4500'
                        }}
                        onClick={this.handleClose}
                      >
                        Cancel
                      </Button>
                    </div>
                    <div>
                      <Moment fromNow>{matchPost && matchPost.moment}</Moment>
                    </div>
                  </div>
                </div>
                <div className="freelancerPostModal__data">
                  <h2>
                    {matchUser &&
                      matchUser.first_name + ' ' + matchUser.last_name}
                  </h2>
                  <p>{matchUser && matchUser.specialty}</p>
                  <p>{matchPost && matchPost.title}</p>
                  <p>{matchPost && matchPost.body}</p>

                  <form>
                    <div className="freelancerPostModal__buttons">
                      <Link
                        to={`/main/profile/${matchUser && matchUser.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Button
                          style={{
                            backgroundColor: '#0000FF'
                          }}
                        >
                          View My Profile
                        </Button>
                      </Link>

                      <Button
                        href={`mailto:${this.props.freelancer[0] &&
                          this.props.freelancer[0]
                            .email}?subject=I'd like to offer you a position with... `}
                        style={{
                          backgroundColor: '#008000'
                        }}
                      >
                        Email this Freelancer
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
    freelancer: state.freelancerReducer.freelancer,
    freelancerPosts: state.freelancerReducer.freelancerPosts,
    user: state.userReducer.user,
    users: state.userReducer.users
  };
}
export default connect(
  mapStateToProps,
  {
    getFreelancer,
    getFreelancerPosts,
    getUser,
    getUsers
  }
)(FreelancerPostModal);
