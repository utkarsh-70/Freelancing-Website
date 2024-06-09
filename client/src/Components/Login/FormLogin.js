import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./FormLogin.css";
import ModalAlert from "../../Classes/Modals/ModalAlert";

class FormLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showModal: false
    };
  }

  onClickRegister = e => {
    this.props.setView("Register");
  };

  onEmailChange = input => {
    this.setState({ email: input.target.value });
  };

  onPasswordChange = input => {
    this.setState({ password: input.target.value });
  };

  postRequest = () => {
    fetch("/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.isAdmin) {
          this.props.setSigninStatus(true, this.state.email);
          this.props.setView("AdminHome");
          this.props.setAdmin(true);
          this.props.setOmbudsman(false);
        }
        else if (data.isOmbudsman) {
          this.props.setSigninStatus(true, this.state.email);
          this.props.setView("OmbudsmanHome");
          this.props.setOmbudsman(true);
          this.props.setAdmin(false); //to remove post issue from navbar
        }
        else if (data.isCustomer) {
          this.props.setSigninStatus(true, this.state.email);
          this.props.setView("Feed");
          this.props.setAdmin(false);
          this.props.setOmbudsman(false);
          this.props.setCustomer(true);
          this.props.setUser(data.user);
        }
        else if (data.isSP) {
          this.props.setSigninStatus(true, this.state.email);
          this.props.setView("SPFeed");
          this.props.setAdmin(false);
          this.props.setOmbudsman(false);
          this.props.setUser(data.user);
        }
        else {
          this.handleModalShow();
        }
      })
  }

  handleModalHide = () => { (this.props.parent)?this.props.parent.handleModalHide():this.setState({ showModal: false }); }
  handleModalShow = () => { (this.props.parent)?this.props.parent.handleModalShow():this.setState({ showModal: true }); }

  render() {
    return (
      <div className="formlogin form">
        <h2 style={{ color: "#F9FBE7" }}>Login</h2>
        {(this.state.showModal)?<ModalAlert show={this.state.showModal} onHide={this.handleModalHide} head="Invalid Credidentials" body="Incorrect username or password is provided. Please try again." />:null}
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="test">Email</Form.Label>
            <Form.Control id="tvEmail" type="email" placeholder="Email" onChange={this.onEmailChange} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label className="test">Password</Form.Label>
            <Form.Control id="tvPassword" type="password" placeholder="Password" onChange={this.onPasswordChange} />
          </Form.Group>
          <Button id="btnLogin" variant="primary" onClick={this.postRequest}>
            Login
          </Button>
          <br />
          <br />
          <Button id="btnRegister" variant="secondary" onClick={this.onClickRegister} >
            Not a user? Register here
          </Button>
        </Form>
      </div>
    );
  }
}

export default FormLogin;
