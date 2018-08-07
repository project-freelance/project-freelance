import React, { Component } from "react";

class Setup extends Component {
  render() {
    return (
      <div>
        <div>Are you an Employer or a Freelancer</div>
        <div>
          <button onClick={() => this.props.updateRole}>Employer</button>
          <button onClick={() => this.props.updateRole}>Freelancer</button>
        </div>
        <div>
          Are you a Developer or a Designer?
          <button onClick={() => this.props.updateSpecialty}>Employer</button>
          <button onClick={() => this.props.updateSpecialty}>Freelancer</button>
        </div>
      </div>
    );
  }
}

export default Setup;
