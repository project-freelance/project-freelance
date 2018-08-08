import React, { Component } from 'react';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
// Material UI

import './Settings.css';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      first_name: 'Cat in the Hat',
      last_name: '',
      email: '',
      age: '',
      experience: 0
    };
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
    console.log(this.state);
  };
  handleExperienceChange = experience => event => {
    this.setState({
      [experience]: event.target.value
    });
    console.log(this.state);
  };
  render() {
    return (
      <div>
        <h1>Settings</h1>
        <div>
          <form
            className={'settings__formContainer'}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="name"
              label="First Name"
              className={'hellow World'}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
            <TextField
              id="name"
              label="Last Name"
              className={'hellow World'}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
            <TextField
              id="name"
              label="email"
              className={'hellow World'}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
            <FormControl className={'form'}>
              <NativeSelect
                className={'form'}
                value={this.state.experience}
                name="experience"
                onChange={this.handleExperienceChange('experience')}
              >
                <option value="" disabled>
                  experience
                </option>
                <option value={0}> 0 years</option>
                <option value={1}> >1 year</option>
                <option value={3}>1 - 3 years</option>
                <option value={5}> >5 years</option>
              </NativeSelect>
              <FormHelperText>Experience</FormHelperText>
            </FormControl>
          </form>
          <div />
        </div>
        <button onClick={() => console.log(this.state)} />
      </div>
    );
  }
}

export default Settings;
