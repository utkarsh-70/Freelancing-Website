import React, { Component } from "react";
import './Comments.css';
import { Promise } from "mongoose";

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",
      comment: {
        name: "",
        message: "",
        time: ""
      }
    };
    // bind context to methods
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Handle form input field changes & update the state
   */
  handleFieldChange = event => {
    const { value, name } = event.target;
    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value
      }
    });
  };
  /**
   * Form submit handler
   */
  onSubmit(e) {
    let derivetime = new Date().toString();
    
    // prevent default form submission
    e.preventDefault();
    // loading status and clear error
    this.setState({ error: "", loading: true });

    // persist the comments on server
    let { comment } = this.state;
    comment.name=this.props.email;
    comment.time = derivetime;
    let promise = new Promise(function(resolve, reject) {
      resolve(comment);
    });
    promise.then(
      comment => this.props.addComment(comment,()=>{  fetch("/postcomment", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id:this.props.issueid,comments:this.props.comments})
      })
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            this.setState({ loading: false, error: res.error });
          } else {
            // add time return from api and push comment to parent state
            comment.time = derivetime;
            // clear the message box
            this.setState({
              loading: false,
              comment: { ...comment, message: "" }
            });
          }
        })
        .catch(err => {
          this.setState({
            error: "Something went wrong while submitting form.",
            loading: false
          });
        });
      })
    );
  }

  renderError() {
    return this.state.error ? (
      <div className="">{this.state.error}</div>
    ) : null;
  }

  render() {
    return (
      <React.Fragment>
        <form className="form-group-comments" method="post" onSubmit={this.onSubmit}>
          <div className="form-group-comments-one">
            <input
              onChange={this.handleFieldChange}
              value={this.state.comment.message}
              className="form-control"
              placeholder="🤬😎 Place your comments here..."
              name="message"
              rows="5"
              required
            />
          </div>

          {this.renderError()}

          <div className="form-group-comments-two">
            <button disabled={this.state.loading} className="btn btn-primary">
              Comment➤
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}