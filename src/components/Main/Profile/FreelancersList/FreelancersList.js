import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllFreelancerInfo } from "../../../../ducks/freelancerReducer";
import "./FreelancersList.css";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";

class FreelancersList extends Component {
  constructor() {
    super();
    this.state = {
      filterString: "",
      smallProfileShow: true,
      fullProfileShow: false
    };
  }

  componentDidMount() {
    this.props.getAllFreelancerInfo();
  }

  handleChange = e => {
    this.setState({
      filterString: e.target.value
    });
  };

  render() {
    // below allows user to search with upper- or lower-case text. Changes first letter in search to Uppercase
    let searchText =
      this.state.filterString.charAt(0).toUpperCase() +
      this.state.filterString.slice(1);

    let freelancers = this.props.allFreelancers
      .filter((freelancer, ind) => {
        return (
          freelancer.specialty.includes(searchText) ||
          freelancer.first_name.includes(searchText) ||
          freelancer.last_name.includes(searchText)
        );
      })
      .map(freelancer => {
        return (
          <Link to={`/main/profile/${freelancer.user_id}`}>
            <div className="freelancersList__popout__card">
              <img
                className="freelancersList__popout__img"
                src={freelancer.profile_image}
                width="340"
                height="280"
              />
              <div className="freelancersList__popout__textBlock">
                <div className="freelancersList__popout__textBlock__top">
                  <div className="freelancersList__popout__name">
                    {freelancer.first_name} {freelancer.last_name}
                  </div>
                  <div className="freelancersList__popout__minorText">
                    {freelancer.specialty}
                  </div>
                </div>

                <div className="freelancersList__popout__textBlock__bottom">
                  <div className="freelancersList__popout__letsTalk">
                    Let's talk about:
                  </div>
                  <div className="freelancersList__popout__minorText">
                    {freelancer.skills}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      });
    return (
      <div style={{ backgroundColor: "Yellow" }}>
        <div className="freelancersList__header">
          <div className="freelancersList__headerTitle">Search Freelancers</div>
        </div>
        <div className="freelancersList__belowHeader">
          <div className="freelancersList__searchContainer">
            <Input
              fullWidth
              placeholder="Search 'Developer' or 'Designer', or enter name"
              inputProps={{ "aria-label": "Description" }}
              onChange={e => {
                this.handleChange(e);
              }}
            />
          </div>

          <div className="freelancersList__totalWrapper">{freelancers}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ freelancerReducer }) => ({ ...freelancerReducer });

export default connect(
  mapStateToProps,
  { getAllFreelancerInfo }
)(FreelancersList);
