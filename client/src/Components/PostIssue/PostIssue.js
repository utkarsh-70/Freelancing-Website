import React, { Component } from "react";
import "./PostIssue.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import ModalAlert from "../../Classes/Modals/ModalAlert";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
// import { images } from "./images";
// import axios from 'axios';
import householdimg from '../../Assets/household.jpg';
import communityimg from '../../Assets/community.jpg';
import governmentimg from '../../Assets/government.png';
import carousal1 from '../../Assets/carousal1.jpg';
import carousal2 from '../../Assets/carousal2.jpg';
import carousal3 from '../../Assets/carousal3.png';
import carousal4 from '../../Assets/carousal4.png';

class PostIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel: "",
      i: 0,
      showModal: false,
      complaintName: "",
      pay: "",
      department: "Others",
      description: "",
      other: "",
      type: "Household",
      householdChk: true,
      format: 'h:mm a',
      tstart: moment().hour(9).minute(0),
      tend: moment().hour(18).minute(0),
      file: '',
      imagePreviewUrl: ''
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ i: this.state.i + 1 }, () => {
        if (this.state.i % 10 === 1 || this.state.i % 10 === 5 || this.state.i % 10 === 9)
          this.setState({ carousel: carousal1 });
        else if (this.state.i % 10 === 2 || this.state.i % 10 === 8)
          this.setState({ carousel: carousal2 });
        else if (this.state.i % 10 === 3 || this.state.i % 10 === 6 || this.state.i % 10 === 0)
          this.setState({ carousel: carousal3 });
        else if (this.state.i % 10 === 4 || this.state.i % 10 === 7)
          this.setState({ carousel: carousal4 });
      });
    }, 3500);
  }

  handleModalHide = () => {
    setTimeout(() => this.setState({ showModal: false }), 500);
    this.props.setView("Feed");
  }

  handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
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
    if (input.target.value === "Community" || input.target.value === "Government")
      this.setState({ householdChk: false });
    else
      this.setState({ householdChk: true });
    console.log(input.target.value);
    this.setState({ type: input.target.value });
  };
  onTime1Change = (value) => {
    // console.log(value.utc().format());
    this.setState({ tstart: value });
  }
  onTime2Change = (value) => {
    this.setState({ tend: value });
  }

  handleSubmit = () => {
    if (this.state.department === "Others")
      this.setState({ department: this.state.other });
    const data=new FormData();
    data.append("image",this.state.file);
    fetch("/postIssue", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.props.email,
        complaintName: this.state.complaintName,
        pay: this.state.pay,
        imageURL:this.state.file.name,
        workNature: this.state.department,
        description: this.state.description,
        type: this.state.type,
        tstart: this.state.tstart,
        tend: this.state.tend,
        pincode: this.props.user.pincode,
        status: "Pending"
      })
    });
    fetch('/uploadImage',{
      method:"post",
      body:data,
    })
      // .then(
      //   fetch('/uploadImage', {
      //   method: "post",
      //   body: data,
      // }))
      .then(res => { console.log(res); return res })
      .then(res => { console.log(res); return res.json() })
      .then(data => {
        this.setState({ showModal: true });
      })
      .catch(error => window.alert(error))
    // console.log("Posting issue using axios");
    // axios.post("/postIssue", {
    //   email: this.props.email,
    //   complaintName: this.state.complaintName,
    //   pay: this.state.pay,
    //   workNature: this.state.department,
    //   description: this.state.description,
    //   type: this.state.type,
    //   status: "Pending"
    // }).then(res => {console.log(res); return res})
    //   .then(res => res.data)
    //   .then(data => {
    //     console.log(data);
    //     this.setState({ showModal: true });
    //   })
    //   .catch(error => alert(error));
  };

  disabledHours = () => { return [0, 1, 2, 3, 4, 5, 6, 7, 22, 23]; }

  render() {
    let { carousel } = this.state;
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="imagePreview" />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }
    return (
      <div className="postIssue form">
        <img id="carousel" alt="mypic" src={carousel} />
        <h2>Post your issue here</h2>
        <br />
        {(this.state.showModal) ? <ModalAlert show={this.state.showModal} onHide={this.handleModalHide} head="Issue successfully submitted!" body="Press close to continue." /> : null}
        <Form onSubmit={(e) => { e.preventDefault(); this.handleSubmit(); }}>
          <Form.Row>
            <Form.Group as={Col} controlId="ComplaintName">
              <Form.Label>Complaint Name</Form.Label>
              <Form.Control type="text" placeholder="Complaint Name" onChange={this.onCmpNameChange} required />
            </Form.Group>
          </Form.Row>
          <label>
            <input id="hi" type="radio" name="test" value="Household" onChange={this.onIssueTypeChange} checked={this.state.householdChk} />
            <img alt="Household" src={householdimg} />
            <p>Household Issue</p>
          </label>
          <label>
            <input id="ci" type="radio" name="test" value="Community" onChange={this.onIssueTypeChange} />
            <img alt="Community Issue" src={communityimg} />
            <p>Community Issue</p>
          </label>
          <label>
            <input id="di" type="radio" name="test" value="Government" onChange={this.onIssueTypeChange} />
            <img alt="Government issue" src={governmentimg} />
            <p>Government Issue</p>
          </label>
          {(this.state.type === "Household") ? <Form.Row>
            <Col>
              <Form.Group controlId="estimated pay">
                <Form.Label>Estimated pay</Form.Label>
                <Form.Control type="number" /*value="300"*/ placeholder="Rs.1000" onChange={this.onPayChange} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Row><Col>
                <Form.Label>Specify available time(start and end)</Form.Label>
              </Col></Form.Row>
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
          </Form.Row> : null}
          <Form.Row>
            <Form.Group as={Col} controlId="depttype">
              <Form.Label>Type of work</Form.Label>
              <Form.Control as="select" onChange={this.onDeptChange} required>
                <option>Others</option>
                <option>Carpentry</option>
                <option>Electric</option>
                <option>Civil</option>
                <option>Plumbing</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="others">
              <Form.Label>others</Form.Label>
              <Form.Control placeholder="If others please specify" onChange={this.onOthersChange} disabled={this.state.department === "Others" ? null : "disabled"} required />
            </Form.Group>
          </Form.Row>
          <textarea id="textDesc" name="myTextBox" cols="50" rows="5" placeholder="Please enter a brief description of your problem" onChange={this.onDescriptionChange} required />
          {/* <div className="previewComponent">
          <form>
            <input className="fileInput" name="image"
              type="file"
              accept="image/*" 
              onChange={(e)=>this.handleImageChange(e)} />
           </form>
          <div className="imgPreview">
            {$imagePreview}
          </div>
        </div> */}
          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="I Agree to the terms and conditions" required />
          </Form.Group>
          <Button type="submit" variant="primary" /*onClick={this.handleSubmit}*/ >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default PostIssue;
