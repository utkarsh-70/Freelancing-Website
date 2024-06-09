import React from "react";
import Comment from "./Comments";
import './Comments.css'

class CommentList extends React.Component {
    constructor() {
        super();
        this.state = {
            shown: false,
        };
    }	
    
    toggle() {
        this.setState({
            shown: !this.state.shown
        });
    }
    
    render() {
        var shown = {
            display: this.state.shown ? "block" : "none"
        };
        return (
            <div className="commentList">
                <h5 className="text-muted-Comment ">
                    <span style={{display: "inline"}} className="badge badge-success">{this.props.comments.length}</span>{" "}
                    Comment{this.props.comments.length > 0 ? "s" : ""}
                    <button style={{ float: "right"}} className=" btn btn-primary " onClick={this.toggle.bind(this)}>View Comments ➤</button>
                </h5>
                
                {this.props.comments.length === 0 && !this.props.loading ? (
                    <div className="alert text-center alert-info">
                    Be the first to comment
                    </div>
                ) : null}
                <div style={ shown } >
                    {this.props.comments.map((comment, index) => (
                        <Comment key={index} comment={comment} />
                    ))}
                </div>
            </div>
        );
      }
}

export default CommentList;