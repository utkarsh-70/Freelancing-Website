import React, { Component } from "react";
import { Button, Tab, Row, Col, Nav, FormControl } from "react-bootstrap";
import "./AdminHome.css";
import Customer from "../../Classes/Customer";
import Issue from "../../Classes/Issue";
import Freelancer from "../../Classes/Freelancer";
import Organization from "../../Classes/Organization";
import CardX from "../../Classes/CardX/CardX";
import loadingIcon from '../../Assets/loading.gif';
import restartIcon from '../../Assets/restart.png';

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      users: [],
      freelancers: [],
      organizations: [],
      issuesDisplay: [],
      usersDisplay: [],
      freelancerDisplay: [],
      organizationDisplay: [],
      loading: false,
      searchValue: ""
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch("/admin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.props.email
      })
    })
      .then(res => res.json())
      .then(data => {
        let allIssues = data.allIss.map((issue, index) => {
          return new Issue(issue);
        });
        let allCustomers = data.allCus.map((customer, index) => {
          return new Customer(customer);
        });
        let allFreelancers = data.allFreelan.map((freelancer, index) => {
          return new Freelancer(freelancer);
        });
        let allOrganizations = data.allOrgs.map((organization, index) => {
          return new Organization(organization);
        });
        this.setState({
          issues: allIssues.map((issue, index) => <CardX header={issue.complaintName} content={issue} parent={this} isAdmin={true} key={index} />),
          users: allCustomers.map((user, index) => <CardX header={user.fname} content={user} parent={this} isAdmin={true} key={index} />),
          freelancers: allFreelancers.map((freelancer, index) => <CardX header={freelancer.fname} content={freelancer} parent={this} isAdmin={true} key={index} />),
          organizations: allOrganizations.map((organization, index) => <CardX header={organization.name} content={organization} parent={this} isAdmin={true} key={index} />),
        });
      })
      .then( () => {
        this.setState({
          issuesDisplay: this.state.issues,
          usersDisplay: this.state.users,
          freelancerDisplay: this.state.freelancers,
          organizationDisplay: this.state.organizations
        });
      })
      .then( () => {
        this.setState({ loading: false });
      });
  }

  fetchLog = () => {
    // window.open('http://localhost:5000/logs',"_blank");
    fetch("/logs")
      .then(res => res.text())
      .then(text => {
        //   THIS IS TO GET LOG IN NEW TAB PAGE.
        var logWindow = window.open("", "_blank");
        logWindow.document.write("<pre>" + text + "</pre>");
      });
  };

  refershHandler = () => this.componentDidMount();
  dashboardHandler = () => { this.props.setView("Dashboard"); }

  searchinput = async (input) => {
    let { issues, users, freelancers, organizations } = this.state;
    this.setState({ searchValue: input.target.value }, () => {
      let inputValue = (this.state.searchValue!==null) ? this.state.searchValue.trim().toLowerCase() : "";
      let inputLength = inputValue.length;
      this.setState({ issuesDisplay:      (inputLength === 0) ? issues : issues.filter(card => card.props.header.toLowerCase().slice(0, inputLength) === inputValue ) });
      this.setState({ usersDisplay:       (inputLength === 0) ? users : users.filter(card => card.props.header.toLowerCase().slice(0, inputLength) === inputValue ) });
      this.setState({ freelancerDisplay:  (inputLength === 0) ? freelancers : freelancers.filter(card => card.props.header.toLowerCase().slice(0, inputLength) === inputValue ) });
      this.setState({ organizationDisplay:(inputLength === 0) ? organizations : organizations.filter(card => card.props.header.toLowerCase().slice(0, inputLength) === inputValue ) });
    });
  }

  render() {
    let { issuesDisplay, usersDisplay, freelancerDisplay, organizationDisplay, loading } = this.state;

    return (
      // <div id="adminHomeRoot">
      //     <div id="issuesContainer">
      //         <p id="containerTitle">Current Issues</p>
      //         {issues.map((issue, index) => <p id="issues" key={index}>{issue.complaintName}</p> )}
      //     </div>
      //     <div id="usersContainer">
      //         <p id="containerTitle">Users</p>
      //         {users.map((user, index) => <p id="users" key={index}>{user.fname}</p> )}
      //     </div>
      //     <div>
      //         <Button variant="outline-info" size="lg" onClick={this.fetchLog}>Get Log</Button>
      //     </div>
      // </div>
      <div id="adminHomeRoot">
        <div id="adminTabs">
          <Tab.Container defaultActiveKey="issueTab">
            <Row>
              <Col sm={2}>
                <h2>Category</h2><hr />
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="issueTab">Issues</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="customerTab">Customers</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="freelancerTab">Freelancers</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="organizationTab">Organizations</Nav.Link>
                  </Nav.Item>
                </Nav>
                <div id="adminStatistics">
                  <h2>Controls</h2><hr />
                  <div className="controls">
                    <div className="control small" onClick={this.refershHandler}><img className="action" src={restartIcon} alt="Reload" />
                    Reload Data
                  </div></div>
                  <FormControl className="searchbar" type="text" placeholder="Search" onChange={this.searchinput} />
                  <Button id="btnDashboard" variant="outline-info" size="lg" onClick={this.dashboardHandler}>Dashboard</Button>
                  <Button id="btnLog" variant="outline-info" size="lg" onClick={this.fetchLog}>Site Log</Button>
                </div>
              </Col>
              <div className="vr" xs="true"></div>
              <Col sm={9} lg>
                <Tab.Content>
                  <Tab.Pane eventKey="issueTab" className="container">
                    <h2>Posted Issues</h2><hr />
                    {(loading)?<img className="loadingIcon" src={loadingIcon} alt='Loading...' />:issuesDisplay}
                  </Tab.Pane>
                  <Tab.Pane eventKey="customerTab" className="container">
                    <h2>Registered Customers</h2><hr />
                    {(loading)?<img className="loadingIcon" src={loadingIcon} alt='Loading...' />:usersDisplay}
                  </Tab.Pane>
                  <Tab.Pane eventKey="freelancerTab" className="container">
                    <h2>Registered Freelancers</h2><hr />
                    {(loading)?<img className="loadingIcon" src={loadingIcon} alt='Loading...' />:freelancerDisplay}
                  </Tab.Pane>
                  <Tab.Pane eventKey="organizationTab" className="container">
                    <h2>Registered Organizations</h2><hr />
                    {(loading)?<img className="loadingIcon" src={loadingIcon} alt='Loading...' />:organizationDisplay}
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    );
  }
}

export default AdminHome;
