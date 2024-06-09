import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import './ComCard.css';
import '../Issue';
import thumbsupIcon from '../../Assets/thumbsup.png';
import thumbsdownIcon from '../../Assets/thumbsdown.png';
import donationIcon from '../../Assets/donation.png';
import CommentList from '../../Components/Comments/CommentList';
import CommentForm from '../../Components/Comments/CommentForm';

class ComCard extends Component {
    constructor(props) {
        super(props);
        let cont;
        if (this.props.content.className === 'Issue') {
            cont = (
                <div className='cardxContent' >
                    <table className="detailsTable"><tbody>
                        <tr><th> Description:   </th><td> {this.props.content.description}</td></tr>
                        <tr><th> WorkNature:    </th><td> {this.props.content.workNature}</td></tr>
                        <tr><th> Status:        </th><td> {this.props.content.status}</td></tr>
                    </tbody></table>
                </div>
            )
        }
        else {
            cont = (
                <div className='cardxContent' >
                    Unable to resolve classname. Check site console for details and contact site admin.
                </div>
            )
            console.log('unresolved class name: ' + this.props.content.className);
            console.log(this.props.content);
        }

        this.state = {
            content: cont,
            upvote: 0,
            downvote: 0,
            comments: [],
            loading: false,
            myvote: 0
        };
    }

    componentDidMount() {
        fetch("/comcard2", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                issueid: this.props.issueid,
                email: this.props.email
            })
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ downvote: data.nod });
                this.setState({ upvote: data.nou });
                this.setState({ myvote: data.myv })
            })
        fetch("/loadcomments", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                issueid: this.props.issueid
            })
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ comments: data.comments });

            })
    }

    handleUpvote = input => {
        fetch("/comcard", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                issueid: this.props.issueid,
                email: this.props.email,
                type: 'upvote'
            })
        })
            .then(res => res.json())          // convert to plain text
            .then(data => {
                if (!data.errorStatus) {
                    //page reload
                    this.props.parent.componentDidMount();
                }
            });
    }

    handleDownvote = input => {
        fetch("/comcard", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                issueid: this.props.issueid,
                email: this.props.email,
                type: 'downvote'
            })
        })
            .then(res => res.json())          // convert to plain text
            .then(data => {
                if (!data.errorStatus) {
                    this.props.parent.componentDidMount();
                }
            });
    }

    addComment = (comment, callback) => {
        this.setState({
            loading: false,
            comments: [comment, ...this.state.comments],
        }, () => callback());
    }

    render() {
        let { upvote, downvote, /*uStatus, dStatus*/ } = this.state;
        // console.log(this.props.feedType);
        if (this.props.feedType === "trendy" && upvote <= 2)
            return (null);
        else {
            return (
                <div className={(this.props.feedType === "trendy") ? "cardxRoot1" : "cardxRoot"}>
                    <div className="cardxHeader" >
                        {this.props.header}
                    </div>
                    <div className="cardxBody">
                        {this.state.content}
                        <span id="comControls">
                            <Button className="control" variant="primary" onClick={this.handleUpvote} disabled={this.state.myvote === 1 ? "disabled" : null}>
                                {<img className="action" src={thumbsupIcon} alt='upvote' />}
                                {upvote}
                            </Button>
                            <Button className="control" variant="primary" onClick={this.handleDownvote} disabled={this.state.myvote === 2 ? "disabled" : null}>
                                {<img className="action" src={thumbsdownIcon} alt='downvote' />}
                                {downvote}
                            </Button>
                            {(this.props.content.type === "Community") ?
                                <div className="control" onClick={this.props.handleDonate}>
                                    {<img className="action" src={donationIcon} alt='donate' />}
                                    <strong>Donate</strong>
                                </div>
                                : null}
                        </span>
                        <br />
                        {(this.props.feedType !== "trendy") ?
                            <div id='mainCommentPanel'>
                                <div id='panelOne'> <CommentForm addComment={this.addComment} comments={this.state.comments} issueid={this.props.issueid} email={this.props.email} />  </div>
                                <div id='panelTwo'> <CommentList comments={this.state.comments} /> </div>
                            </div>
                            : null}
                    </div>
                </div>
            );
        }
    }
}

export default ComCard;
