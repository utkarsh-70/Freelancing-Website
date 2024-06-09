import React, { Component } from 'react';
import {Form, Col, Button} from 'react-bootstrap';
import moment from 'moment';

class OrganizationReg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            headquaters: "",
            mobile: "",
            workforce: "",
            iAgree: false,
            chkElectrician: false,
            chkPlumber: false,
            chkCarpenter: false,
            chkCivil: false,
            otherWork: "",
            certificates: "",
            skills: [],
            rating: 0,
            noOfIssues: 0,
            tstart: moment()
        }
    }

    onNameChange    = (input) => { this.setState({ name: input.target.value }) }
    onEmailChange   = (input) => { this.setState({ email: input.target.value }) }
    onPasswordChange= (input) => { this.setState({ password: input.target.value }) }
    onAddChange     = (input) => { this.setState({ headquaters: input.target.value }) }
    onMobileChange  = (input) => { this.setState({ mobile: input.target.value }) }
    onWorkforceChange=(input) => { this.setState({ workforce: input.target.value }) }
    onChkChange     = (input) => { this.setState({ iAgree:!this.state.iAgree }); }
    onCertificatesChange=(input)=>{this.setState({ certificates:input.target.value })}

    handleRegister = () => {
        if(this.state.chkElectrician)this.state.skills.push("Electrical");
        if(this.state.chkPlumber)   this.state.skills.push("Plumbing");
        if(this.state.chkCarpenter) this.state.skills.push("Carpentry");
        if(this.state.chkCivil)     this.state.skills.push("Civil");
        if(this.state.otherWork.length>0) {
            let others = this.state.otherWork.split(",")
            others = others.map((work,index) => {return work.trim()});
            this.setState({ skills: this.state.skills.concat(others) });
        }
        if(!this.state.iAgree) {
            window.alert("Please agree to T&C to continue.")
            return;
        }
        fetch("/regOrganization", {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                headquaters: this.state.headquaters,
                mobile: this.state.mobile,
                workforce: this.state.workforce,
                skills: this.state.skills,
                tstart: this.state.tstart
            })
          })
          .then(res => res.json())
          .then(data => {
              if(data.accepted){
                window.alert("Successfully registered!!!, login to continue.");
                this.props.setView("Home");
              }
                else {
                    window.alert("Organization already enrolled, contact site admin for more details.");
                    this.setState({ skills:[] });
                }
          })
    }

    render() {
        return (
            <div id="freelanRegRoot">
            <h1>Organization</h1>
            <Form onSubmit={(e) => { e.preventDefault(); setTimeout(800, this.handleRegister()); } } >
                <Form.Row>
                    <Form.Group as={Col} controlId="formOrgName">
                        <Form.Label>Name of Organization</Form.Label>
                        <Form.Control type="text" placeholder="Organization Name" onChange={this.onNameChange} required />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formOrgEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="email@example.com" onChange={this.onEmailChange} required />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formOrgPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.onPasswordChange} required />
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="formOrgAddress">
                    <Form.Label>Headquaters location</Form.Label>
                    <Form.Control placeholder="Ex: NH1, New Delhi" onChange={this.onAddChange} required />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formOrgMobile">
                        <Form.Label>Telephone No.</Form.Label>
                        <Form.Control placeholder="Telephone No" onChange={this.onMobileChange} required />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formOrgWorkforce">
                        <Form.Label>Workforce Count</Form.Label>
                        <Form.Control placeholder="Ex: 58" onChange={this.onWorkforceChange} required />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Label className="skills" as={Col} >Skills : </Form.Label>
                    <Form.Check as={Col} className="skills" type="checkbox" label="Electrician" onChange={(input) => this.setState({ chkElectrician:!this.state.chkElectrician })} />
                    <Form.Check as={Col} className="skills" type="checkbox" label="Plumber" onChange={(input) => this.setState({ chkPlumber:!this.state.chkPlumber })} />
                    <Form.Check as={Col} className="skills" type="checkbox" label="Civil" onChange={(input) => this.setState({ chkCivil:!this.state.chkCivil })} />
                    <Form.Check as={Col} className="skills" type="checkbox" label="Carpenter" onChange={(input) => this.setState({ chkCarpenter:!this.state.chkCarpenter })} />
                    <Form.Group as={Col} controlId="otherOrgWork"><Form.Control placeholder="Other Skills" onChange={(input) => this.setState({ otherWork:input.target.value })} /></Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formOrgCertificates">
                        <Form.Label>Certificates (if any) </Form.Label>
                        <Form.Control type="text" placeholder="list of certificates" onChange={this.onCertificatesChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Group id="formOrgCheckbox">
                    <Form.Check type="checkbox" label="I Agree to the terms and conditions" checked={this.state.iAgree} onChange={this.onChkChange} required />
                </Form.Group>
                <Button type="Submit" variant="primary" >Submit</Button>
            </Form>
            </div>
        );
    }
}

export default OrganizationReg;