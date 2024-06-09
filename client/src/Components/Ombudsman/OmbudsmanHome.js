import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './OmbudsmanHome.css';
import loadingIcon from '../../Assets/loading.gif';
import Issue from '../../Classes/Issue';
import CardX from '../../Classes/CardX/CardX';

class OmbudsmanHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracked: [],
            untracked: [],
            completed: [],
            loading: false
        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        fetch('/Ombudsman', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.props.email
            })
        }).then(res => res.json())
        .then(data => {
            this.setState({
                tracked: data.trakedIssues.map((issue, index) => { return <CardX header={issue.complaintName} content={new Issue(issue)} parent={this} key={index} controls="Control" isOmbudsman={true} />; }),
                untracked: data.untrackedIssues.map((issue, index) => { return <CardX header={issue.complaintName} content={new Issue(issue)} parent={this} controls="Track" key={index} isOmbudsman={true} />; }),
                completed: data.completedIssues.map((issue, index) => { return <CardX header={issue.complaintName} content={new Issue(issue)} parent={this} controls="Restart" key={index} isOmbudsman={true} />; }),
            });
        }).then( () => {
            this.setState({ loading: false });
        } );
    }
    
    render() {
        let { tracked,untracked,completed,loading } = this.state;
        return(
            <Container id="ombudsmanRoot" fluid="true">
                <Row>
                    {!this.props.completedIssues && (
                    <React.Fragment>
                    <Col sm={5} lg>
                        <div id="headerPanel">
                            Tracked Issues
                        </div>
                        <div>
                            {(loading)?<img className="loadingIcon" src={loadingIcon} alt='Loading...' />:tracked}
                        </div>
                    </Col>
                    <div className="vr" sm={1}></div>
                    <Col sm={6} lg>
                        <div id="headerPanel">
                            New Government Issues
                        </div>
                        <div>
                            {(loading)?<img className="loadingIcon" src={loadingIcon} alt='Loading...' />:untracked}
                        </div>
                    </Col>
                    </React.Fragment>
                    )}
                    {this.props.completedIssues && (
                    <Col>
                        <div id="headerPanel">
                            Completed Issues
                        </div>
                        <div id="completedContainer">
                            {(loading)?<img className="loadingIcon" src={loadingIcon} alt='Loading...' />:completed}
                        </div>
                    </Col>
                    )}
                </Row>
            </Container>
        );
    }
}

export default OmbudsmanHome;