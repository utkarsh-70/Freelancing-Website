import React, { Component } from "react";
import "./Home.css";
import FormLogin from "../Login/FormLogin";
import ModalAlert from '../../Classes/Modals/ModalAlert';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginSection: null,
      users: 1,
      organizations: 2,
      freelancers: 3,
      issues: 4,
      usersEnd: 574,
      organizationsEnd: 27,
      freelancersEnd: 263,
      issuesEnd: 498,
      showModal: false,
    };
    // this.counter = this.counter.bind(this);
    // this.count = this.count.bind(this);
  }

  handleModalHide = () => { this.setState({ showModal: false }); }
  handleModalShow = () => { this.setState({ showModal: true }); }

  componentDidMount() {
    this.count();
    this.setState({
      loginSection: (this.props.signinStatus)?null:
        <FormLogin setUser={this.props.setUser} setView={this.props.setView} setSigninStatus={this.props.setSigninStatus} setAdmin={this.props.setAdmin} 
          setOmbudsman={this.props.setOmbudsman} setCustomer={this.props.setCustomer} parent={this}  /> 
    });
  }

  counter = () => {
    if (this.state.users < this.state.usersEnd) {
      this.setState({ users: this.state.users + 10 });
    }
    if (this.state.organizations < this.state.organizationsEnd) {
      this.setState({ organizations: this.state.organizations + 1 });
    }
    if (this.state.freelancers < this.state.freelancersEnd) {
      this.setState({ freelancers: this.state.freelancers + 6 });
    }
    if (this.state.issues < this.state.issuesEnd) {
      this.setState({ issues: this.state.issues + 10 });
    }
  };

  count() {
    setInterval(() => { this.counter() }, 30);
  }

  render() {
    //let loginSection = (this.props.signinStatus)?null:<FormLogin setView={this.props.setView} setSigninStatus={this.props.setSigninStatus} />;
    let { users,organizations,freelancers,issues } = this.state;

    return (
        <div id="home">
            {(this.state.showModal)?<ModalAlert show={this.state.showModal} onHide={this.handleModalHide} head="Invalid Credidentials" body="Incorrect username or password is provided. Please try again." />:null}
            <div id="headerPanel">
                <h1 style={{paddingTop: "0.2em"}}>Issue Redressal System</h1>
            </div>
            <div id="infoLoginPanel" >
                <div id="infoSection" >
                  <h1 id="quoteTop">&ldquo;For the People,</h1><h1 id="quoteBottom">By the People&rdquo;</h1>
                  <br />
                  <p style={{paddingLeft: "8em", textAlign: "left"}}>
                  Trying to fix a leakage?, Problem with Power Supply?, Have a Roadblock?, You have come to the right place. We have professional service providers 
                  whom you can employ to solve your issue.
                  </p>
                  {/* Generally it is observed in case of Metropolitan cities, where the citizens are not so much acquainted with the service providers in their locality because of the non-permanent nature of their jobs, they find it difficult to contact service providers to address their  problems like improper water supply, bad sanitation and electricity failures.<br />
                  Welcome to a one-stop portal where the you can fix your issues by contacting freelancing electricians, plumbers, etc to serve your needs.Have a Problem? why wait?Login and lodge a complaint to avail the service. We will monitor the status of the grievance until its fixation. */}
                </div>
                <span id="loginSection">{this.state.loginSection}</span>
            </div>
            <div id="statisicsPanel">
                <span className="homeCard">
                    <h2>{users}</h2>
                    <h3>Users</h3>
                </span>
                <span className="homeCard">
                    <h2>{organizations}</h2>
                    <h3>Organizations</h3>
                </span>
                <span className="homeCard">
                    <h2>{freelancers}</h2>
                    <h3>Freelancers</h3>
                </span>
                <span className="homeCard">
                    <h2>{issues}</h2>
                    <h3>Issues</h3>
                </span>
            </div>
        </div>
    );
  }
}

export default Home;
