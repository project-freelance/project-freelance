import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getEmployerPosts,
  deleteEmployerPost
} from "../../../ducks/employerReducer";
import {
  getFreelancerPosts,
  deleteFreelancerPost
} from "../../../ducks/freelancerReducer";
import { getUsers } from "../../../ducks/userReducer";
import { getFaveJobs } from "../../../ducks/freelancerReducer";
import "../Feed/Feed.css";
import Post from "../Feed/Post/Post";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import FreelancerPostModal from "./Post/FreelancerPostModal/FreelancerPostModal";
import EmployerPostModal from "./Post/EmployerPostModal/EmployerPostModal";
import Button from "@material-ui/core/Button";
import DeleteForever from "@material-ui/icons/DeleteForever.js";
import FilterList from "@material-ui/icons/FilterList.js";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
//

class Feed extends Component {
  constructor() {
    super();
    this.state = {
      showFreelancers: true,
      showEmployers: true,
      anchorEl: null,
      open: false
    };
    this.filterFreelancers = this.filterFreelancers.bind(this);
    this.filterEmployers = this.filterEmployers.bind(this);
    this.resetFeed = this.resetFeed.bind(this);
  }

  componentDidMount() {
    this.props.getEmployerPosts();
    this.props.getFreelancerPosts();
    this.props.getUsers();
    this.props.getFaveJobs();
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  filterFreelancers() {
    this.setState({ showFreelancers: false, showEmployers: true });
  }
  filterEmployers() {
    this.setState({ showEmployers: false, showFreelancers: true });
  }
  resetFeed() {
    this.setState({ showEmployers: true, showFreelancers: true });
  }

  render() {
    const { anchorEl } = this.state;

    //getting logged in user's favorite jobs and list job numbers in an array
    let matchJob = this.props.favJobs
      .filter(person => person.freelancer_id === this.props.user[0].id)
      .map(item => item.employer_post_id);

    let { employerPosts, freelancerPosts, users } = this.props;

    //function to merge arrays and sort by moment
    function preMerge(arr1, arr2) {
      let result = [...arr1, ...arr2];
      return result.sort(function(a, b) {
        return a.moment < b.moment ? 1 : b.moment < a.moment ? -1 : 0;
      });
    }

    //invoking the merge function passing in our arrays
    let mergedArrays = preMerge(employerPosts, freelancerPosts);

    //reassign merged array contents based on menu filters
    if (this.state.showFreelancers === false) {
      mergedArrays = employerPosts;
    } else if (this.state.showEmployers === false) {
      mergedArrays = freelancerPosts;
    } else {
      mergedArrays = preMerge(employerPosts, freelancerPosts);
    }

    //mapping through merged freelancer and employer arrays
    let mergedStyled = mergedArrays.map((post, index) => {
      //matching post to user who posted to display user data
      let postUser = users.map((user, i) => {
        if (post.user_id === user.id) {
          //if freelancer display this in return
          if (user.role === "Freelancer") {
            return (
              <div key={index}>
                <div className="feed__mergedFreelancerContainer">
                  <div className="feed__freelancerUser">
                    <div className="feed__is__freelancer">
                      <h3>Freelancer</h3>
                    </div>
                    <Link
                      className="feed__linkToUser"
                      to={`/main/profile/${user.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="feed__freelancerImage">
                        <img
                          className="feed__freelancerImage--picture"
                          src={user.profile_image}
                          alt="person"
                        />
                      </div>
                      <div className="feed__userName">
                        <p>{`${user.first_name} ${user.last_name}`}</p>
                        {user.specialty}
                      </div>
                    </Link>
                  </div>

                  <div className="feed__freelancerPosting">
                    <div className="feed__freelancerPosting__header">
                      <h3>{post.title}</h3>
                    </div>
                    <div className="feed__freelancerPosting__body">
                      <p>{post.body}</p>
                    </div>
                  </div>
                  <div className="feed__freelancerPosting__rightdiv">
                    <div className="feed__freelancerModalButton">
                      <FreelancerPostModal
                        postUserId={post.user_id}
                        postId={post.id}
                        email={user.email}
                        favJobs={this.props.favJobs}
                        pic={user.profile_image}
                        firstName={user.first_name}
                        lastName={user.last_name}
                        specialty={user.specialty}
                        title={post.title}
                        body={post.body}
                        moment={post.moment}
                      />
                      <div className="">
                        {post.user_id === this.props.user[0].id ? (
                          <Button
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "#7fc4fd"
                            }}
                            onClick={() =>
                              this.props
                                .deleteFreelancerPost(post.id)
                                .then(() => {
                                  this.props.getFreelancerPosts();
                                })
                            }
                          >
                            <Tooltip title="Delete Post">
                              <DeleteForever />
                            </Tooltip>
                          </Button>
                        ) : null}
                      </div>
                    </div>
                    <div className="feed__freelancerPosting__moment">
                      <Moment fromNow>{post.moment}</Moment>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            //if employer display this in return
            return (
              <div key={i} className="feed__mergedEmployerContainer">
                <div className="feed__employerData">
                  <div className="feed__is__employer">
                    <h3>Employer</h3>
                  </div>
                  <Link
                    className="feed__linkToUser"
                    to={`/main/profile/${user.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="feed__employerImage">
                      <Tooltip title="Click to see Profile">
                        <img
                          className="feed__employerImage--picture"
                          src={user.profile_image}
                          alt="person"
                        />
                      </Tooltip>
                      <div className="feed__employerName">
                        <p>{`${user.first_name} ${user.last_name}`}</p>
                        <p>{user.specialty}</p>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="feed__employerPosting">
                  <div className="feed__employerPosting__header">
                    <h3>
                      {/* Employer Posting: &nbsp; */}
                      {post.title}
                    </h3>
                  </div>
                  <div className="feed__employerPosting__body">
                    <p>{post.body}</p>
                  </div>
                </div>
                <div className="feed__employerPosting__rightdiv">
                  <div className="feed__employerPosting__employerModalButton">
                    {post.user_id === (this.props.user[0].id || 1) ? (
                      <Button
                        style={{
                          width: "20px",
                          height: "20px",
                          color: "#7fc4fd"
                        }}
                        onClick={() =>
                          this.props.deleteEmployerPost(post.id).then(() => {
                            this.props.getEmployerPosts();
                          })
                        }
                      >
                        <Tooltip title="Delete Post">
                          <DeleteForever />
                        </Tooltip>
                      </Button>
                    ) : null}
                    <EmployerPostModal
                      postUserId={post.user_id}
                      postId={post.id}
                      favJobs={this.props.favJobs}
                      pic={user.profile_image}
                      firstName={user.first_name}
                      lastName={user.last_name}
                      specialty={user.specialty}
                      title={post.title}
                      body={post.body}
                      price={post.price}
                      moment={post.moment}
                    />
                  </div>
                  <div className="feed__employerModalButton">
                    {matchJob.includes(post.id) && (
                      <div className="feed__applied">
                        <p>APPLIED</p>
                      </div>
                    )}
                  </div>
                  <div className="feed__employerPosting__rightdiv__specialty__price">
                    <p>
                      Looking For: &nbsp;
                      <strong>{post.specialty}</strong>
                    </p>
                    <hr />
                    <p>
                      Pay Rate: &nbsp; <strong>${post.price}</strong>
                    </p>
                  </div>
                  <div className="feed__employerPosting__moment">
                    <Moment fromNow>{post.moment}</Moment>
                  </div>
                </div>
              </div>
            );
          }
        } else {
          return null;
        }
      });
      return <div key={index}>{postUser} </div>;
    });

    //render return the merged mapped arrays
    return (
      <div className="feed__container">
        <div className="feed__topNav">
          <div className="feed__filterMenu">
            <Button
              aria-owns={anchorEl ? "filter-menu" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              style={{
                color: "white"
              }}
            >
              Filter
              <FilterList />
            </Button>
            <Menu
              id="filter-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              // open={open}
              onClose={this.handleClose}
            >
              <MenuItem
                onClick={() => {
                  this.handleClose(), this.filterFreelancers();
                }}
              >
                Employers Post Only
              </MenuItem>
              <MenuItem
                onClick={() => {
                  this.handleClose(), this.filterEmployers();
                }}
              >
                Freelancers Post Only
              </MenuItem>
              <MenuItem
                onClick={() => {
                  this.handleClose(), this.resetFeed();
                }}
              >
                All News Feed
              </MenuItem>
              <Link to="/main/freelancers">
                <MenuItem
                  onClick={() => {
                    this.handleClose();
                  }}
                >
                  See All Freelancers List
                </MenuItem>
              </Link>
              {/* <Route path="/main/freelancers" component={FreelancersList} /> */}
            </Menu>
          </div>
        </div>
        <div>
          <h1>Feed</h1>
          <Post />
          <div className="feed__merged__newsFeed">{mergedStyled}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    employerPosts: state.employerReducer.employerPosts,
    freelancerPosts: state.freelancerReducer.freelancerPosts,
    user: state.userReducer.user,
    users: state.userReducer.users,
    favJobs: state.freelancerReducer.favJobs
  };
}

export default connect(
  mapStateToProps,
  {
    getEmployerPosts,
    getFreelancerPosts,
    getUsers,
    getFaveJobs,
    deleteFreelancerPost,
    deleteEmployerPost
  }
)(Feed);
