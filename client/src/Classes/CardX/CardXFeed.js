import React, { Component } from 'react';
import govtIcon from '../../Assets/govt.png';
import editIcon from '../../Assets/edit.png';
import deleteIcon from '../../Assets/delete.png';
import doneIcon from '../../Assets/done.png';
import '../CardX/CardX.css';
import '../Issue';
class CardX extends Component {
    constructor(props) {
        super(props);
        let cont;
        const images=require.context('../../uploads');

        if (this.props.content.className === 'Issue') {
            cont = (
                <div className='cardxContent' >
                {(this.props.content.imageURL)?
                <img className="rajphoto" src= {images('./'+this.props.content.imageURL)} />
                :null}
                    <table className="detailsTable"><tbody>
                        <tr><th>Complaint Name: </th><td> {this.props.content.complaintName} </td></tr>
                        <tr><th>Description:    </th><td> {this.props.content.description} </td></tr>
                        <tr><th>Pay:            </th><td> {this.props.content.pay} </td></tr>
                        <tr><th>Type:           </th><td> {this.props.content.type} </td></tr>
                        <tr><th>WorkNature:     </th><td> {this.props.content.workNature} </td></tr>
                        {(this.props.content.type === "Household") ?
                            <React.Fragment>
                                <tr><th>Open time:      </th><td> {this.props.content.tstart.format('h:mm a')} </td></tr>
                                <tr><th>Close time:     </th><td> {this.props.content.tend.format('h:mm a')} </td></tr>
                            </React.Fragment> : null}
                        <tr><th>Status:         </th><td> {this.props.content.status} </td></tr>
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
            showBody: false,
            content: cont
        };
    }

    toggleBody = () => { this.setState({ showBody: !this.state.showBody }); }

    redToGovt = () => {
        fetch('/redirectGovt', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.props.content.id,
            })
        }).then(res => res.json())
            .then(data => {
                if (!data.errorStatus) {
                    //page reload
                    this.props.parent.componentDidMount();
                }
            });
    }

    redToEdit = () => {
        this.props.storeData(this.props.content);
        this.props.setView("EditIssue");
    }

    redToRating = () => {
        this.props.storeData(this.props.content);
        this.props.setView("RatingPage");
    }

    redToDelete = () => {
        if (window.confirm("This operation is not reversible. Do you want to continue?")) {
            fetch('/feedDelete', {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: this.props.content.id
                })
            }).then(res => res.json())
                .then(data => {
                    if (!data.errorStatus) {
                        //page reload
                        this.props.parent.componentDidMount();
                    }
                });
        }
    }

    render() {
        return (
            <div className="cardxRoot">
                <div className="cardxHeader" onClick={this.toggleBody} >
                    {this.props.header}
                    {(this.props.content.status!=="Completed")?
                    <span id="controls">
                        {this.state.showBody && this.props.myIssues && !(this.props.content.type === "Government") ? (
                            <div className="control" onClick={this.redToGovt}>
                                <img className="action" src={govtIcon} alt='govt' />
                                Redirect to Govt
                            </div>
                        ):null}
                        {this.state.showBody && (
                            <div className="control" onClick={this.redToDelete}>
                                <img className="action" src={deleteIcon} alt='delete' />
                                Delete
                            </div>
                        )}
                        {this.state.showBody && (
                            <div className="control" onClick={this.redToEdit}>
                                <img className="action" src={editIcon} alt='edit' />
                                Edit
                            </div>
                        )}
                        {this.state.showBody && this.props.content.status!=="Pending" && (
                            <div className="control" onClick={this.redToRating}>
                                <img className="action" src={doneIcon} alt='done' />
                                Completed
                            </div>
                        )}
                    </span>
                    :null}
                </div>
                {
                    this.state.showBody && (
                        <div className="cardxBody" onClick={this.toggleBody} >
                            {this.state.content}
                        </div>
                    )
                }
            </div>
        );
    }
}

export default CardX;