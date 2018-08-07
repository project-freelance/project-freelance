import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

class Profile extends Component {
  render() {
    return (
      <div>
        <div className="employer_profile_title">
          <TextField
            label="Employer Title"
            id="simple-start-adornment"
            className=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Kg</InputAdornment>
              )
            }}
          />
        </div>
        <div className="employer_profile_image">Company Logo</div>
        <div className="employer_profile_name">First Name and Last Name</div>
        <div className="employer_profile_city">City</div>
        <div className="employer_profile_upload_company_logo">
          Upload Company Logo
        </div>
        <div className="employer_profile_about">About</div>
      </div>
    );
  }
}

export default Profile;
