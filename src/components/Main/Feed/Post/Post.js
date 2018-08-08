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
      specialty: 0,
      price: 0
    };
  }

  componentDidMount() {
    this.props.getUser();
  }

  handlePosts() {
    this.props.getUser(this.state.id, {
      role: this.state.user[0].role
    });
    console.log(this.state.user[0].role);
  }

  handleSpecialtyChange = specialty => event => {
    this.setState({
      [specialty]: event.target.value
    });
  };

  render() {
    const { title, body, specialty, price } = this.state;
    // console.log(this.props.user[0] && this.props.user[0].id);

    // {
    //   this.state.user.role === 'Employer' && <div />;
    // }

    // {this.state.user.role === 'Freelancer' && (

    // )}

    return (
      <div>
        {/* create freelancer posting */}
        <button onClick={() => console.log(this.state)} />
        <div className="freelancer__posting">
          <h2>Create Freelancer Posting</h2>
          <form>
            <div>
              <TextField
                id="Title"
                label="Title"
                className={'freelancer__post__title__input'}
                value={title}
                onChange={e => this.setState({ title: e.target.value })}
                margin="normal"
              />
            </div>
            <div>
              <TextField
                id="Description"
                label="Description"
                className={'freelancer__post__body__input'}
                value={body}
                onChange={e => this.setState({ body: e.target.value })}
                margin="normal"
              />
            </div>
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
          <h2>Create Job Posting</h2>
          <form>
            <div>
              <TextField
                id="Title"
                label="Title"
                className={'employer__post__title__input'}
                value={title}
                onChange={e => this.setState({ title: e.target.value })}
                margin="normal"
              />
            </div>
            <div>
              <TextField
                id="Description"
                label="Description"
                className={'employer__post__body__input'}
                value={body}
                onChange={e => this.setState({ body: e.target.value })}
                margin="normal"
              />
            </div>
            <div>
              <FormControl className={'form'}>
                <NativeSelect
                  className={'employer__post__specialty__input'}
                  value={specialty}
                  name="specialty"
                  onChange={this.handleSpecialtyChange('specialty')}
                >
                  <option value="" disabled />
                  <option value={'Developer'}> Developer </option>
                  <option value={'Designer'}> Designer </option>
                </NativeSelect>
                <FormHelperText>Specialty: Choose one</FormHelperText>
              </FormControl>
            </div>

            <div>
              <TextField
                id="Description"
                label="Price $"
                className={'employer__post__price__input'}
                value={price}
                onChange={e => this.setState({ price: e.target.value })}
                margin="normal"
              />
            </div>
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
