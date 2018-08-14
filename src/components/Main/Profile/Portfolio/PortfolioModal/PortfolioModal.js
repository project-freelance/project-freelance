import React, { Component } from "react";
import Portfolio from "../Portfolio";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import "./PortfolioModal.css";

export default class PortfolioModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <div className="profile__portfolio__container">
          <img
            className="profile__portfolio__image"
            src={this.props.url1}
            onClick={this.handleClickOpen}
          />
          <img
            className="profile__portfolio__image"
            src={this.props.url2}
            onClick={this.handleClickOpen}
          />
          <img
            className="profile__portfolio__image"
            src={this.props.url3}
            onClick={this.handleClickOpen}
          />
        </div>
        <Dialog
          className="profile__portfolio__modal__container"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          // contentStyle={{
          //   width: '500px',
          //   maxWidth: '100%',
          //   height: '500px',
          //   padding: '10px'
          // }}
        >
          <DialogContent>
            <div className="profile__portfolio__modal">
              <Portfolio
                url1={this.props.url1}
                link1={this.props.link1}
                url2={this.props.url2}
                link2={this.props.link2}
                url3={this.props.url3}
                link3={this.props.link3}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
