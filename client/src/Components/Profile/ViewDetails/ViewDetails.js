import React,{Component} from 'react';
import './ViewDetails.css';

class ViewDetails extends Component{

    constructor(props) {
        super(props);
        this.state = {
            editClicked:false
        }
    }

    handleClick = () => {
        this.setState({editClicked:true});
    }

    render() {
        return(
            <div id="viewDetailsRoot">
                <table id="VDTable">
                <tbody >
                    <tr className="allRows">
                        <th className="leftColumn">First Name</th>
                        <td className="rightColumn">
                        <div >
                            {(this.state.editClicked) ? <input type="text"/> : (this.props.user.fname)}
                        </div>
                        </td>
                    </tr>
                    <tr className="allRows">
                        <th className="leftColumn">Last Name</th>
                        <td className="rightColumn">{this.props.user.lname}</td>
                    </tr>
                    <tr className="allRows">
                     <th className="leftColumn">Email</th>
                     <td className="rightColumn">{this.props.user.email}</td>
                        
                    </tr>
                    <tr className="allRows">
                        <th className="leftColumn">Address</th>
                        <td className="rightColumn">{this.props.user.address}</td>
                    </tr>
                    <tr className="allRows">
                        <th className="leftColumn">City</th>
                        <td className="rightColumn">{this.props.user.city}</td>
                    </tr>
                    <tr className="allRows">
                        <th className="leftColumn">State</th>
                        <td className="rightColumn">{this.props.user.state}</td>
                    </tr>
                    <tr className="allRows">
                        <th className="leftColumn">Pincode</th>
                        <td className="rightColumn">{this.props.user.pincode}</td>
                    </tr>
                    <tr className="allRows">
                        <th className="leftColumn">Mobile</th>
                        <td className="rightColumn">{this.props.user.mobile}</td>
                    </tr>
                    <tr className="allRows">
                        <th className="leftColumn">Aadhaar</th>
                        <td className="rightColumn">{this.props.user.aadhaar}</td>
                    </tr>
                </tbody>
                </table>
                {/* <img id="editButton" alt="Edit" src={EditButton} onClick={this.handleClick()} /> */}
            </div>
        );
    }
}

export default ViewDetails;