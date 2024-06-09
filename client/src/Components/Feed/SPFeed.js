import React, { Component } from 'react';
import { Tab, Row, Col, Nav, FormControl } from "react-bootstrap";
import './SPFeed.css';
//import SPFeed from './Components/Feed/SPFeed'
import Issue from '../../Classes/Issue';
import loadingIcon from '../../Assets/loading.gif';
import SPCard from '../../Classes/CardX/SPCard';
import ModalMiddle from '../../Classes/Modals/ModalMiddle';
import restartIcon from '../../Assets/restart.png';

class SPFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: [],
            issuesDisplay: [],
            acceptedIssues: [],
            loading: false,
            modalShow: false,
            modalData: {head:"Unavailable", body:"Data Unavailable", issue:"No Data", isSelected:true},
            searchValue: "",
            myPin: (this.props.user)?this.props.user.pincode:500078,
        }
    }

    componentDidMount() {
        //fetch issue details from backend
        let { myPin } = this.state;
        this.setState({ loading: true });
        fetch('/spfeed', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.props.email
            })
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    issues: data.allIss.map((issue, index) => { return <SPCard header={issue.complaintName} content={new Issue(issue)} parent={this} key={index} myIssues={true} />; }),
                    localIssues: data.allIss.map((issue, index) => { return (myPin+5 > issue.pincode && myPin-5 < issue.pincode)?<SPCard header={issue.complaintName} content={new Issue(issue)} parent={this} key={index} myIssues={true} />:null }),
                    acceptedIssues: data.acptdIss.map((issue, index) => { return <SPCard header={issue.complaintName} content={new Issue(issue)} parent={this} key={index} myIssues={true} />; }),
                });
            }).then( () => {
                this.setState({ loading:false });
            }).then( () => {
                let input = {target: {value: ""}}
                this.searchinput(input);
            });
    }

    searchinput = async (input) => {
        let { issues } = this.state;
        this.setState({ searchValue: input.target.value }, () => {
            let inputValue = (this.state.searchValue!==null) ? this.state.searchValue.trim().toLowerCase() : "";
            let inputLength = inputValue.length;
            this.setState({
                issuesDisplay: (inputLength === 0) ? issues : issues.filter(card => card.props.header.toLowerCase().slice(0, inputLength) === inputValue )
            });
        });
    }

    handleClose = () => {this.setState({ modalShow: false });}
    handleOpen = (data) => {this.setState({ modalShow: true, modalData: data });}
    handleAcceptIssue = () => {
        if(window.confirm("Do you want to accept this issue?")) {
            //issue accepted.
            fetch('/acceptIssue', {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.props.email,
                    id: this.state.modalData.issue.id
                })
            }).then(res => res.json())
            .then(data => {
                if (!data.errorStatus) {
                    window.alert("Issue taken up Successfully");
                    this.componentDidMount();
                }
            });
        }
        this.handleClose();
    }

    render() {
        let { issuesDisplay, acceptedIssues, localIssues, loading } = this.state;
        console.log(this.state.localIssues);

        let ai = (
            <React.Fragment>
            {/* <h2 id="spFeedHeading">Selected Issues</h2> */}
            {acceptedIssues}
            </React.Fragment>
        )

        return (
            <React.Fragment>
            {/* <h2 id="spFeedHeading">Available Issues</h2> */}
            <div style={{padding: "0.2vh 2vw"}}>
                <br />
                <Tab.Container defaultActiveKey="acceptedTab">
                    <Row>
                    <Col sm={2}>
                        <h2>Category</h2><hr />
                        <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="issueTab">Issues nearby</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="acceptedTab">Selected Issues</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="customerTab">All Issues</Nav.Link>
                        </Nav.Item>
                        </Nav>
                        <div id="adminStatistics">
                        <h2>Options</h2><hr />
                        <div className="controls">
                            <div className="control small" onClick={() => {this.componentDidMount()}}><img className="action" src={restartIcon} alt="Reload" />
                            Reload Data
                        </div></div>
                        <FormControl className="searchbar" type="text" placeholder="Search" onChange={this.searchinput} />
                        </div>
                    </Col>
                    <div className="vr" xs="true"></div>
                    <Col sm={9} lg>
                        <Tab.Content>
                        <Tab.Pane eventKey="issueTab" className="container">
                            <h2>Issues Near Me</h2><hr />
                            <div id="spFeedRoot">
                                {(loading) ? <img className="loadingIcon" src={loadingIcon} alt='Loading...' /> : localIssues}
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="acceptedTab" className="container">
                            <h2>Selected Issues</h2><hr />
                            <div id="spFeedRoot">
                                {(acceptedIssues.length !== 0) ? 
                                    ai : (loading) ?
                                        <img className="loadingIcon" src={loadingIcon} alt='Loading...' /> : <h3>In need of work?<br />checkout issues in your locality!</h3>}
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="customerTab" className="container">
                            <h2>All Issues</h2><hr />
                            <div id="spFeedRoot">
                                {(loading) ? <img className="loadingIcon" src={loadingIcon} alt='Loading...' /> : issuesDisplay}
                            </div>
                        </Tab.Pane>
                        </Tab.Content>
                    </Col>
                    </Row>
                </Tab.Container>
            </div>
            <ModalMiddle show={this.state.modalShow} onHide={this.handleClose} accept={this.handleAcceptIssue} content={this.state.modalData} />
            </React.Fragment>
        );
    }
}

export default SPFeed;