import React, { Component } from "react";
import { updateEmployer } from "../../ducks/employerReducer";

class Setup extends Component {
  constructor() {
    super();
    this.state = {
      role: "",
      specialty: ""
    };
  }

  chooseEmployer() {
    this.setState({
      role: "Employer"
    }).then(this.props.updateRole("Employer"));
  }

  chooseFreelancer() {
    this.setState({
      role: "Freelancer"
    }).then(this.props.updateRole("Freelancer"));
  }

  chooseDeveloper() {
    this.setState({
      role: "Developer"
    }).then(this.props.updateSpecialty("Developer"));
  }

  chooseDesigner() {
    this.setState({
      role: "Designer"
    }).then(this.props.updateSpecialty("Designer"));
  }

  render() {
    return (
      <div>
        <div>Are you an Employer or a Freelancer</div>
        <div>
          <button onClick={() => this.chooseEmployer}>Employer</button>
          <button onClick={() => this.chooseFreelancer}>Freelancer</button>
        </div>
        <div>
          Are you a Developer or a Designer?
          <button onClick={() => this.chooseDeveloper}>Developer</button>
          <button onClick={() => this.chooseDesigner}>Designer</button>
        </div>
      </div>
    );
  }
}

export default Setup;
