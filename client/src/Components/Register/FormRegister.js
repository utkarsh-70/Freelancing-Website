import React, { Component } from "react";
import "./FormRegister.css";
import { Form, Button, Col } from "react-bootstrap";
import ModalAlert from "../../Classes/Modals/ModalAlert";
import moment from 'moment';

class FormRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      address: "",
      community: "",
      city: "",
      state: "",
      pincode: "",
      mobile: "",
      aadhaar: "",
      iAgree: false,
      alert: { head: null, body: null },
      showModal: false,
      tstart: moment()
    };
  }

  onFnameChange = input => { this.setState({ fname: input.target.value }); };
  onLnameChange = input => { this.setState({ lname: input.target.value }); };
  onEmailChange = input => { this.setState({ email: input.target.value }); };
  onPasswordChange = input => { this.setState({ password: input.target.value }); };
  onAddChange = input => { this.setState({ address: input.target.value }); };
  onCommunityChange = input => { this.setState({ community: input.target.value }); };
  onCityChange = input => { this.setState({ city: input.target.value }); };
  onStateChange = input => { this.setState({ state: input.target.value }); };
  onPinChange = input => { this.setState({ pincode: input.target.value }); };
  onMobileChange = input => { this.setState({ mobile: input.target.value }); };
  onAadhaarChange = input => { this.setState({ aadhaar: input.target.value }); };
  onChkChange = input => { this.setState({ iAgree: !this.state.iAgree }); };

  handleModalHide = () => {
    this.setState({ showModal: false }, () => {
      if(this.state.alert.head === "Successfully Registered!") setTimeout(1000, this.props.setView("Home"));
    });
  }

  handleRegister = () => {
    fetch("/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        password: this.state.password,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        pincode: this.state.pincode,
        mobile: this.state.mobile,
        aadhaar: this.state.aadhaar,
        tstart: this.state.tstart
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.accepted) {
          this.setState({ showModal: true, alert: {head:"Successfully Registered!", body:"Login to continue." } });
        }
        else {
          this.setState({ showModal: true, alert: {head:"User already existing", body:"Given email already exists. Please use another or login to continue" } });
        }
      })
      .catch(error => window.alert(error));
  };

  handleServiceRegister = () => {
    this.props.setView("ServiceProviderReg");
  };

  render() {
    return (
      <div className="formregister form">
        {(this.state.showModal)?<ModalAlert show={this.state.showModal} onHide={this.handleModalHide} head={this.state.alert.head} body={this.state.alert.body} />:null}
        <h2 id="heading">New Customer? register here</h2>
        <Form onSubmit={(e) => { e.preventDefault(); setTimeout(800, this.handleRegister()); }}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                onChange={this.onFnameChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridLName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                onChange={this.onLnameChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email@example.com"
                onChange={this.onEmailChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={this.onPasswordChange}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                placeholder="1234 Main St"
                onChange={this.onAddChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCommunity">
              <Form.Label>Enter Your Community</Form.Label>
              <Form.Control
                placeholder="Medchal"
                onChange={this.onCommunityChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridMobile">
              <Form.Label>Mobile No.</Form.Label>
              <Form.Control
                placeholder="Mobile No"
                onChange={this.onMobileChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridAadhaar">
              <Form.Label>Aadhaar No.</Form.Label>
              <Form.Control
                placeholder="Aadhaar No"
                onChange={this.onAadhaarChange}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                placeholder="City"
                onChange={this.onCityChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control as="select" onChange={this.onStateChange}>
                <option>Choose...</option>
                <option>Andhra Pradesh</option>
                <option>Arunachal Pradesh</option>
                <option>Assam</option>
                <option>Bihar</option>
                <option>Chattisgarh</option>
                <option>Gujarat</option>
                <option>Karnataka</option>
                <option>Kerala</option>
                <option>Rajasthan</option>
                <option>TamilNadu</option>
                <option>Telangana</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Pin Code</Form.Label>
              <Form.Control
                placeholder="Pincode"
                onChange={this.onPinChange}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="I Agree to the terms and conditions"
              checked={this.state.iAgree}
              onChange={this.onChkChange}
              required
            />
          </Form.Group>
          <Button type="Submit" variant="primary">
            Submit
          </Button>
        </Form>
        <div>
          <br />
          <h5>
            Trying to help the society?{" "}
            <a href="#serviceReg" onClick={this.handleServiceRegister}>
              Register Here
            </a>
            .
          </h5>
        </div>
      </div>
    );
  }
}

export default FormRegister;
