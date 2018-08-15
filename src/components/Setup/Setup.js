import React, { Component } from "react";
import { getUser, updateRole, updateSpecialty } from "../../ducks/userReducer";
import { addPortfolio } from "../../ducks/portfolioReducer";
import { addFreelancer } from "../../ducks/freelancerReducer";
import { addEmployer } from "../../ducks/employerReducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Setup.css";
import Settings from "../Main/Settings/Settings";
import Button from "@material-ui/core/Button";
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
    this.props
      .getUser()
      .then(() => this.setState({ id: this.props.user[0].id }));
  }

  chooseEmployer() {
    let id = this.state.id && this.state.id;

    this.props.updateRole(this.state.id, {
      role: this.state.roleEmployer
    });
    this.props.addEmployer(id);
    this.setState({
      employerClicked: true,
      freelancerClicked: false
    });
  }

  chooseFreelancer() {
    let id = this.state.id && this.state.id;

    this.props.updateRole(this.state.id, {
      role: this.state.roleFreelancer
    });
    this.props.addFreelancer(id);
    this.setState({
      freelancerClicked: true,
      employerClicked: false
    });
    this.props.addPortfolio(this.state.id);
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
    console.log(this.props);
    return (
      <div className="setup__container">
        <h1>Are you a Freelancer or an Employer?</h1>

        <div className="setup__chooseRole">
          <Button
            style={{
              backgroundColor: this.state.freelancerClicked ? "green" : "blue",
              color: "white",
              marginRight: "20px"
            }}
            onClick={() => {
              this.chooseFreelancer();
            }}
          >
            Freelancer
          </Button>
          <Button
            style={{
              backgroundColor: this.state.employerClicked ? "green" : "blue",
              color: "white"
            }}
            onClick={() => this.chooseEmployer()}
          >
            Employer
          </Button>
        </div>

        {/* if employer is clicked send to next */}
        {this.state.employerClicked && (
          <div className="setup__next">
            <Link to="/main/settings">
              <Button
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  marginTop: "20px"
                }}
              >
                Next
              </Button>
            </Link>
          </div>
        )}

        {/* if freelancer is clicked show specialty options */}
        {this.state.freelancerClicked && (
          <div className="setup__chooseSpecialty">
            <h2> Are you a Developer or a Designer?</h2>
            <Button
              style={{
                backgroundColor: this.state.developerClicked ? "green" : "blue",
                color: "white",
                marginRight: "20px"
              }}
              onClick={() => this.chooseDeveloper()}
            >
              Developer
            </Button>
            <Button
              style={{
                backgroundColor: this.state.designerClicked ? "green" : "blue",
                color: "white"
              }}
              onClick={() => this.chooseDesigner()}
            >
              Designer
            </Button>
          </div>
        )}

        {/* after freelancer picks specialty show next */}
        {this.state.freelancerClicked &&
          (this.state.developerClicked || this.state.designerClicked) && (
            <div className="setup__next">
              <Link to="/main/settings">
                <Button
                  style={{
                    backgroundColor: "#0D47A1",
                    color: "white",
                    marginTop: "20px"
                  }}
                >
                  Next
                </Button>
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
  {
    getUser,
    updateRole,
    updateSpecialty,
    addPortfolio,
    addFreelancer,
    addEmployer
  }
)(Setup);
