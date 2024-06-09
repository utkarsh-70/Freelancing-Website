import React, { Component } from "react";
import { Button, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./EditIssue.css";
import ModalAlert from "../../Classes/Modals/ModalAlert";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment'
// import Customer from "../../Classes/Customer";
// import Issue from "../../Classes/Issue";
// import Freelancer from "../../Classes/Freelancer";
// import Organization from "../../Classes/Organization";
// import CardX from "../../Classes/CardX/CardX";

class EditIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      carousel: "",
      i: 0,
      complaintName: this.props.storedData.complaintName,
      pay: this.props.storedData.pay,
      department: this.props.storedData.workNature,
      description: this.props.storedData.description,
      other: this.props.storedData.other,
      type: this.props.storedData.type,
      format: 'h:mm a',
      tstart: moment(this.props.storedData.tstart),
      tend: moment(this.props.storedData.tend),
      householdChk: true,
      communityChk: false,
      govtChk: false,
      showModal:false
    };
  }

  componentDidMount() {
    if (this.props.storedData.type === 'Community') {
      this.setState({ householdChk: false });
      this.setState({ communityChk: true });

    }
    else if (this.props.storedData.type === 'Government') {
      this.setState({ householdChk: false });
      this.setState({ govtChk: true });
    }
  }

  onOthersChange = input => {
    this.setState({ other: input.target.value });
  };
  onDescriptionChange = input => {
    this.setState({ description: input.target.value });
  };
  onCmpNameChange = input => {
    this.setState({ complaintName: input.target.value });
  };
  onDeptChange = input => {
    this.setState({ department: input.target.value });
  };
  onPayChange = input => {
    this.setState({ pay: input.target.value });
  };
  onIssueTypeChange = input => {
    if (
      input.target.value === "Community" ||
      input.target.value === "Government"
    )
      this.setState({ householdChk: false });
    else this.setState({ householdChk: true });
    console.log(input.target.value);
    this.setState({ type: input.target.value });
  };
  onTime1Change = (value) => {
    // console.log(value && value.format(this.state.format));
    this.setState({ tstart: value });
  }
  onTime2Change = (value) => {
    this.setState({ tend: value });
  }

  handleSubmit = () => {
    if (this.state.department === "Others")
      this.setState({ department: this.state.other });

    fetch("/editIssue", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.props.storedData.id,
        email: this.props.storedData.email,
        complaintName: this.state.complaintName,
        pay: this.state.pay,
        workNature: this.state.department,
        description: this.state.description,
        tstart: this.state.tstart,
        tend: this.state.tend,
        type: this.state.type
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ showModal: true });
      });
  };

  handleModalHide = () => {
    setTimeout(() => this.props.setView("Feed"), 500);
  }

  disabledHours = () => { return [0, 1, 2, 3, 4, 5, 6, 7, 22, 23]; }

  render() {
    return (
      <div className="editIssue form">
        <h2>Edit your issue</h2>
        {(this.state.showModal)?<ModalAlert show={this.state.showModal} head="Issue successfully edited!" body="press close to continue..." onHide={this.handleModalHide} />:null}
        <Form onSubmit={(e) => {e.preventDefault(); this.handleSubmit();}}>
          <Form.Row>
            <Form.Group as={Col} controlId="ComplaintName">
              <Form.Label>Complaint Name</Form.Label>
              <Form.Control type="text" value={this.state.complaintName} onChange={this.onCmpNameChange} required />
            </Form.Group>
          </Form.Row>
          <label>
            <input id="hi" type="radio" name="test" value="Household" onChange={this.onIssueTypeChange} checked={this.state.householdChk} />
            <img alt="Household" src="https://thumbs.dreamstime.com/b/construction-worker-drilling-hole-wall-new-house-47018944.jpg" />
            <p>Household Issue</p>
          </label>
          <label>
            <input id="ci" type="radio" name="test" value="Community" onChange={this.onIssueTypeChange} checked={this.state.communityChk} />
            <img alt="Community Issue" src="https://i.cbc.ca/1.4649312.1525464898!/fileImage/httpImage/image.jpg_gen/derivatives/original_780/tree-down.jpg" />
            <p>Community Issue</p>
          </label>
          <label>
            <input id="di" type="radio" name="test" value="Government" onChange={this.onIssueTypeChange} checked={this.state.govtChk} />
            <img alt="Government issue" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/220px-Emblem_of_India.svg.png" />
            <p>Government Issue</p>
          </label>
          {(this.state.type === "Household")?<Form.Row>
            <Col>
              <Form.Group controlId="estimated pay">
                <Form.Label>Estimated pay</Form.Label>
                <Form.Control type="number" value={this.state.pay} onChange={this.onPayChange} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Row>
                <Col>
                  <Form.Label>Specify available time(start and end)</Form.Label>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <TimePicker showSecond={false} allowEmpty={false} defaultValue={this.state.tstart} 
                    className="xxx timeSelect" onChange={this.onTime1Change} format={this.state.format} 
                    disabledHours={this.disabledHours} use12Hours inputReadOnly />
                </Col>
                <Col>
                  <TimePicker showSecond={false} allowEmpty={false} defaultValue={this.state.tend} 
                    className="xxx timeSelect" onChange={this.onTime2Change} format={this.state.format} 
                    disabledHours={this.disabledHours} use12Hours inputReadOnly />
                </Col>
              </Form.Row>
            </Col>
          </Form.Row>
          :null}
          <Form.Row>
            <Form.Group as={Col} controlId="depttype">
              <Form.Label>Type of work</Form.Label>
              <Form.Control as="select" value={this.state.department} onChange={this.onDeptChange} required>
                <option>Others</option>
                <option>Carpentry</option>
                <option>Electric</option>
                <option>Civil</option>
                <option>Plumbing</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="others">
              <Form.Label>others</Form.Label>
              <Form.Control
                placeholder="If others please specify"
                onChange={this.onOthersChange}
                disabled={
                  this.state.department === "Others" ? null : "disabled"
                }
                required
              />
            </Form.Group>
          </Form.Row>
          <textarea id="textbox" name="myTextBox" cols="50" rows="5" value={this.state.description} onChange={this.onDescriptionChange} required />
          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="I Agree to the terms and conditions" required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div >
    );
  }
}

export default EditIssue;
