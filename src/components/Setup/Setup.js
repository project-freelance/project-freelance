import React, { Component } from "react";

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
    });
  }

  chooseFreelancer() {
    this.setState({
      role: "Freelancer"
    });
  }

  chooseDeveloper() {
    this.setState({
      role: "Developer"
    });
  }

  chooseDesigner() {
    this.setState({
      role: "Designer"
    });
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
