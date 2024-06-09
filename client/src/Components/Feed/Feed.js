import React, { Component } from 'react';
import './Feed.css';
import Issue from '../../Classes/Issue';
import CardXFeed from '../../Classes/CardX/CardXFeed';
import ComCard from '../../Classes/CardX/ComCard';
import loadingIcon from '../../Assets/loading.gif';
import ModalDonate from '../../Classes/Modals/ModalDonate';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      comIssues: [],
      loading: false,
      trendyIssues: [],
      showModal: false,
      myPin: (this.props.user)?this.props.user.pincode:500078,
    }
  }

  handleDonate = () => { this.setState({ showModal: true }); }
  hideModal = () => { this.setState({ showModal: false }); }

  componentDidMount() {
    //fetch issue details from backend
    let { myPin } = this.state;
    this.setState({ loading: true });
    fetch('/feed', {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.props.email
      })
    }).then(res => res.json())
      .then(data => {
        this.setState({
          issues: data.myIssues.map((issue, index) => { return <CardXFeed header={issue.complaintName} content={new Issue(issue)} parent={this} key={index} myIssues={true} setView={this.props.setView} storeData={this.props.storeData} />; }),
          comIssues: data.comIssues.map((issue, index) => { return (myPin+5 > issue.pincode && myPin-5 < issue.pincode)?<ComCard header={issue.complaintName} content={new Issue(issue)} parent={this} key={index} email={this.props.email} issueid={issue._id} handleDonate={this.handleDonate} />:null; }),
          trendyIssues: data.comIssues.map((issue, index) => { return <ComCard feedType="trendy" header={issue.complaintName} content={new Issue(issue)} parent={this} key={index} email={this.props.email} issueid={issue._id} handleDonate={this.handleDonate} />; })
        });
      }).then(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    let { issues, comIssues, trendyIssues, loading } = this.state;

    return (
      <div id="feedRoot">
        {(this.state.showModal) ? <ModalDonate show={this.state.showModal} onHide={this.hideModal} /> : null}
        <h2 id="myFeed">My Feed </h2> <hr />
        {(loading) ? <img className="loadingIcon" src={loadingIcon} alt='Loading...' /> : issues}
        <hr />
        <h2 id="myFeed">Community Feed</h2>
        <hr />
        <div className="panel panel-default" id="panelMain">
          <div className="panel panel-default" id="panel">
            <div className="panel-heading">
              <h3 className="panel-title">Daily Feed</h3>
            </div>
            <div className="panel-body">
              {(loading) ? <img className="loadingIcon" src={loadingIcon} alt='Loading...' /> : comIssues}
            </div>
          </div>
          <div className="vr"></div>
          <div className="panel panel-default" id="panel2">
            <div className="panel-heading">
              <h3 className="panel-title"> Trendy Issues</h3>
            </div>
            <div className="panel-body">
              {(loading) ? <img className="loadingIcon" src={loadingIcon} alt='Loading...' /> : trendyIssues}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
