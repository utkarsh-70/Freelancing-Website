import React , { Component} from 'react';
import './Comments.css';
class Comments extends Component {  
    render() {
        const { name, message, time } = this.props.comment;
        let msDay = 60*60*1000;
        let answer = Math.floor((new Date()- Date.parse(time))/msDay);
        let days=answer/24;
        var emailName   = name.substring(0, name.lastIndexOf("@"));
        return (
            <div className="commentSection1">
                <img className="adorableimage" width="48" height="48"
                    src={`https://api.adorable.io/avatars/48/${name.toLowerCase()}@adorable.io.png`} alt={name}
                />
                <div className="messageClass">
                    <small className="float-right text-muted">{ (answer<24) ? answer+" hours ago" : parseInt(days)+" day(s) ago"}</small> 
                    <h6 className="mt-0 mb-1 text-muted">{emailName}</h6> 
                    <div className="mt-0 mb-1 text-muted">{message}</div>
                </div>  
            </div>
        );   
    }  
}

export default Comments;