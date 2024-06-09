import React, { Component } from 'react';
import deleteIcon from '../../Assets/delete.png';
import trackIcon from '../../Assets/track.png';
import untrackIcon from '../../Assets/cross.png';
import doneIcon from '../../Assets/done.png';
import restartIcon from '../../Assets/restart.png';
import './CardX.css';
import '../Customer';
import '../Freelancer';
import '../Issue';
import '../Organization';
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
                        <tr><th>Complaint Name:</th><td> {this.props.content.complaintName}</td></tr>
                        <tr><th>Email:         </th><td> {this.props.content.email}</td></tr>
                        <tr><th>Pay:           </th><td> {this.props.content.pay}</td></tr>
                        <tr><th>Type:          </th><td> {this.props.content.type}</td></tr>
                        <tr><th>WorkNature:    </th><td> {this.props.content.workNature}</td></tr>
                        <tr><th>Description:   </th><td> {this.props.content.description}</td></tr>
                        {(this.props.content.type === "Household")?
                        <React.Fragment>
                        <tr><th>Open time:    </th><td> {this.props.content.tstart.format('h:mm a')}</td></tr>
                        <tr><th>Close time:      </th><td> {this.props.content.tend.format('h:mm a')}</td></tr>
                        </React.Fragment>:null}
                        <tr><th>Status:        </th><td> {this.props.content.status}</td></tr>
                    </tbody></table>
                </div>
            )
        }
        else if (this.props.content.className === 'Customer') {
            cont = (
                <div className='cardxContent' >
                    <table className="detailsTable"><tbody>
                        <tr><th>First Name: </th><td> {this.props.content.fname} </td></tr>
                        <tr><th>Last Name:  </th><td> {this.props.content.lname} </td></tr>
                        <tr><th>Email:      </th><td> {this.props.content.email} </td></tr>
                        <tr><th>Password:   </th><td> {this.props.content.password} </td></tr>
                        <tr><th>Address:    </th><td> {this.props.content.address} </td></tr>
                        <tr><th>City:       </th><td> {this.props.content.city} </td></tr>
                        <tr><th>State:      </th><td> {this.props.content.state} </td></tr>
                        <tr><th>Pincode:    </th><td> {this.props.content.pincode} </td></tr>
                        <tr><th>Mobile:     </th><td> {this.props.content.mobile} </td></tr>
                        <tr><th>Aadhaar:    </th><td> {this.props.content.aadhaar} </td></tr>
                    </tbody></table>
                </div>
            )
        }
        else if (this.props.content.className === 'Freelancer') {
            cont = (
                <div className='cardxContent' >
                    <table className="detailsTable"><tbody>
                        <tr><th>First Name:    </th><td> {this.props.content.fname}</td></tr>
                        <tr><th>Last Namename: </th><td> {this.props.content.lname}</td></tr>
                        <tr><th>Email:         </th><td> {this.props.content.email}</td></tr>
                        <tr><th>Password:      </th><td> {this.props.content.password}</td></tr>
                        <tr><th>Address:       </th><td> {this.props.content.address}</td></tr>
                        <tr><th>City:          </th><td> {this.props.content.city}</td></tr>
                        <tr><th>State:         </th><td> {this.props.content.state}</td></tr>
                        <tr><th>Mobile:        </th><td> {this.props.content.mobile}</td></tr>
                        <tr><th>Aadhaar:       </th><td> {this.props.content.aadhaar}</td></tr>
                        <tr><th>Pincode:       </th><td> {this.props.content.pincode}</td></tr>
                    </tbody></table>
                </div>
            )
        }
        else if (this.props.content.className === 'Organization') {
            cont = (
                <div className='cardxContent' >
                    <table className="detailsTable"><tbody>
                        <tr><th>Name:          </th><td> {this.props.content.name}</td></tr>
                        <tr><th>Email:         </th><td> {this.props.content.email}</td></tr>
                        <tr><th>Password:      </th><td> {this.props.content.password}</td></tr>
                        <tr><th>Headquaters:   </th><td> {this.props.content.headquaters}</td></tr>
                        <tr><th>Mobile:        </th><td> {this.props.content.mobile}</td></tr>
                        <tr><th>Workforce:     </th><td> {this.props.content.workforce}</td></tr>
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
            content: cont,
            inProgress: "In Progress",
            pending: "Pending",
            completed: "Completed"
        };
    }

    toggleBody = () => { this.setState({ showBody: !this.state.showBody }); }

    trackItemHandler = (status) => {
        fetch('/ombudTrack', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.props.content.id,
                newStatus: status
            })
        }).then(res => res.json())
            .then(data => {
                if (!data.errorStatus) {
                    //page reload
                    this.props.parent.componentDidMount();
                }
            });
    }

    deleteItemHandler = () => {
        if (window.confirm("This operation is not reversible. Do you want to continue?")) {
            fetch('/adminDelete', {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    documentName: this.props.content.className,
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
                    {this.state.showBody && this.props.isAdmin && (
                        <span id="controls" onClick={this.deleteItemHandler}>
                            <div className="control" >
                                <img className="action" src={deleteIcon} alt='delete' />
                                Delete
                            </div>
                        </span>
                    )}
                    {this.props.isOmbudsman && this.state.showBody && (this.props.controls === "Track") && (
                        <span id="controls">
                            <div className="control" onClick={() => this.trackItemHandler(this.state.inProgress)}>
                                <img className="action" src={trackIcon} alt='track' />
                                Track
                            </div>
                        </span>
                    )}
                    {this.props.isOmbudsman && this.state.showBody && (this.props.controls === "Control") && (
                        <span id="controls">
                            <div className="control" onClick={() => this.trackItemHandler(this.state.pending)}>
                                <img className="action" src={untrackIcon} alt='track' />
                                Untrack
                            </div>
                            <div className="control" onClick={() => this.trackItemHandler(this.state.completed)}>
                                <img className="action" src={doneIcon} alt='done' />
                                Done
                            </div>
                        </span>
                    )}
                    {this.props.isOmbudsman && this.state.showBody && (this.props.controls === "Restart") && (
                        <span id="controls">
                            <div className="control" onClick={() => this.trackItemHandler(this.state.pending)}>
                                <img className="action" src={restartIcon} alt='restart' />
                                Restart
                            </div>
                        </span>
                    )}
                </div>
                {this.state.showBody && (
                    <div className="cardxBody" onClick={this.toggleBody} >
                        {this.state.content}
                    </div>
                )}
            </div>
        );
    }
}

export default CardX;