import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFreelancerPost } from '../../../../ducks/freelancerReducer';
import { addEmployerPost } from '../../../../ducks/employerReducer';
import { getUser } from '../../../../ducks/userReducer';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      specialty: ''
    };
  }

  // onChangeHandlerFreelancer = e => {
  //   console.log(`${e.target.name}: `, e.target.value);
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // };

  // onChangeHandlerEmployer = ev => {
  //   console.log(`${ev.target.name}: `, ev.target.value);
  //   this.setState({
  //     [ev.target.name]: ev.target.value
  //   });
  // };
  handleSpecialtyChange = specialty => event => {
    this.setState({
      [specialty]: event.target.value
    });
    console.log(this.state);
  };

  render() {
    const { title, body, specialty, price } = this.state;
    // console.log(this.props.user[0] && this.props.user[0].id);
    // console.log()
    return (
      <div>
        {/* create freelancer posting */}
        <div className="freelancer__posting">
          <h2>Create Freelancer Posting</h2>
          <form>
            <TextField
              id="Title"
              label="Title"
              className={'freelancer__post__title__input'}
              value={title}
              onChange={e => this.setState({ title: e.target.value })}
              margin="normal"
            />

            <TextField
              id="Description"
              label="Description"
              className={'freelancer__post__body__input'}
              value={body}
              onChange={e => this.setState({ body: e.target.value })}
              margin="normal"
            />

            <button
              onClick={() => {
                this.props.addFreelancerPost(
                  title,
                  body,
                  this.props.user[0] && this.props.user[0].id
                );
              }}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>

        {/* create employer posting */}
        <div className="employer__posting">
          <h2>Create Employer Posting</h2>
          <form>
            <TextField
              id="Title"
              label="Title"
              className={'employer__post__title__input'}
              value={title}
              onChange={e => this.setState({ title: e.target.value })}
              margin="normal"
            />

            <TextField
              id="Description"
              label="Description"
              className={'employer__post__body__input'}
              value={body}
              onChange={e => this.setState({ body: e.target.value })}
              margin="normal"
            />

            {/* <TextField
              id="Description"
              label="Specialty"
              className={'employer__post__specialty__input'}
              value={specialty}
              onChange={e => this.setState({ specialty: e.target.value })}
              margin="normal"
            /> */}

            <FormControl className={'form'}>
              <NativeSelect
                className={'employer__specialty__input'}
                value={specialty}
                name="specialty"
                onChange={this.handleSpecialtyChange('specialty')}
              >
                <option value="" disabled>
                  Specialty
                </option>
                <option value={0}> Developer </option>
                <option value={1}> Designer </option>
              </NativeSelect>
              <FormHelperText>Choose one</FormHelperText>
            </FormControl>

            <TextField
              id="Description"
              label="Price"
              className={'employer__post__price__input'}
              value={price}
              onChange={e => this.setState({ price: e.target.value })}
              margin="normal"
            />

            {/* <FormControl className={'form'}>
              <NativeSelect
                className={'settings__experience__input'}
                value={experience}
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
            </FormControl> */}

            <button
              onClick={() => {
                this.props.addEmployerPost(
                  title,
                  body,
                  specialty,
                  price,
                  this.props.user[0] && this.props.user[0].id
                );
              }}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    freelancerPosts: state.freelancerReducer.freelancerPosts,
    employerPosts: state.employerReducer.employerPosts,
    user: state.userReducer.user
  };
}
export default connect(
  mapStateToProps,
  { addFreelancerPost, addEmployerPost, getUser }
)(Post);
