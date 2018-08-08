import React, { Component } from "react";
import { getUser, updateRole, updateSpecialty } from "../../ducks/userReducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Setup extends Component {
  constructor() {
    super();
    this.state = {
      roleEmployer: "Employer",
      roleFreelancer: "Freelancer",
      specialtyDeveloper: "Developer",
      specialtyDesigner: "Designer",
      id: 0,
      employerClicked: false,
      freelancerClicked: false,
      developerClicked: false,
      designerClicked: false
    };
    this.chooseEmployer = this.chooseEmployer.bind(this);
    this.chooseFreelancer = this.chooseFreelancer.bind(this);
    this.chooseDeveloper = this.chooseDeveloper.bind(this);
    this.chooseDesigner = this.chooseDesigner.bind(this);
  }

  componentDidMount() {
    let userId = this.props.user[0] ? this.props.user[0].id : 123456789;

    this.props.getUser().then(
      this.setState({
        id: userId
      })
    );
  }

  chooseEmployer() {
    this.props.updateRole(this.state.id, {
      role: this.state.roleEmployer
    });
    this.setState({
      employerClicked: true,
      freelancerClicked: false
    });
  }

  chooseFreelancer() {
    this.props.updateRole(this.state.id, {
      role: this.state.roleFreelancer
    });
    this.setState({
      freelancerClicked: true,
      employerClicked: false
    });
  }

  chooseDeveloper() {
    this.props.updateSpecialty(this.state.id, {
      specialty: this.state.specialtyDeveloper
    });
    this.setState({
      developerClicked: true,
      designerClicked: false
    });
  }

  chooseDesigner() {
    this.props.updateSpecialty(this.state.id, {
      specialty: this.state.specialtyDesigner
    });
    this.setState({
      designerClicked: true,
      developerClicked: false
    });
  }

  render() {
    return (
      <div className="setup__container">
        <h1>Are you a Freelancer or an Employer?</h1>

        <div className="setup__chooseRole">
          <button onClick={() => this.chooseFreelancer()}>Freelancer</button>
          <button onClick={() => this.chooseEmployer()}>Employer</button>
        </div>

        {/* if employer is clicked send to next */}
        {this.state.employerClicked && (
          <div className="setup__next">
            <Link to="/main/settings">
              <button>Next</button>
            </Link>
          </div>
        )}

        {/* if freelancer is clicked show specialty options */}
        {this.state.freelancerClicked && (
          <div className="setup__chooseSpecialty">
            <h2> Are you a Developer or a Designer?</h2>
            <button onClick={() => this.chooseDeveloper()}>Developer</button>
            <button onClick={() => this.chooseDesigner()}>Designer</button>
          </div>
        )}

        {/* after freelancer picks specialty show next */}
        {this.state.freelancerClicked &&
          (this.state.developerClicked || this.state.designerClicked) && (
            <div className="setup__next">
              <Link to="/main/settings">
                <button>Next</button>
              </Link>
            </div>
          )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
}
export default connect(
  mapStateToProps,
  { getUser, updateRole, updateSpecialty }
)(Setup);
