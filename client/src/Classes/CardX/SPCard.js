import React, { Component } from 'react';
import './SPCard.css';
import '../Issue';

class SPCard extends Component {
    constructor(props) {
        super(props);
        let cont,fullCont;
        let isAccepted = (this.props.content.status==="Issue taken up")?true:false;
        
        if(this.props.content.className === 'Issue') {
            cont = (
                <div className='spCardContent'>
                    <table className="detailsTable"><tbody>
                        {/* <tr><th> Description:   </th><td> {this.props.content.description} </td></tr> */}
                        <tr><th> WorkNature:    </th><td> {this.props.content.workNature}</td></tr>
                        <tr><th> Pay:           </th><td> {this.props.content.pay}</td></tr>
                        <tr><th> Type:          </th><td> {this.props.content.type}</td></tr>
                        <tr><th> Status:        </th><td> {this.props.content.status}</td></tr>
                    </tbody></table>
                </div>
            )
            fullCont = (
                <div className='spCardContent'>
                    <table className="detailsTable"><tbody>
                        <tr><th> WorkNature:    </th><td> {this.props.content.workNature}</td></tr>
                        <tr><th> Pay:           </th><td> {this.props.content.pay}</td></tr>
                        <tr><th> Email:         </th><td> {this.props.content.email}</td></tr>
                        <tr><th> Type:          </th><td> {this.props.content.type}</td></tr>
                        <tr><th> Status:        </th><td> {this.props.content.status}</td></tr>
                        {(this.props.content.type === "Household")?
                        <React.Fragment>
                        <tr><th> Open time:     </th><td> {this.props.content.tstart.format('h:mm a')}</td></tr>
                        <tr><th> Close time:    </th><td> {this.props.content.tend.format('h:mm a')}</td></tr>
                        </React.Fragment>:null}
                        <tr><th> Description:   </th><td> {this.props.content.description} </td></tr>
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
            console.log('unresolved class name: '+this.props.content.className);
            console.log(this.props.content);
        }

        this.state = {
            content: cont,
            fullContent: fullCont,
            isSelected: isAccepted
        };
    }

    handleShow = () => { this.props.parent.handleOpen({ head:this.props.header, body:this.state.fullContent, issue:this.props.content, isSelected:this.state.isSelected }) }

    render() {
        return (
            <div className="spCardRoot" onClick={this.handleShow}>
                <div className="cardxHeader" >
                    {this.props.header}
                   
                </div>
                <div className="cardxBody">
                    {this.state.content} 
                    {
                        //<span id="comControls">
                        //    <div className="control" onClick={null}>
                        //        {/* uncomment img tage and get suitable icon */}
                        //        {/* <img className="action" src={govtIcon} alt='govt' /> */}
                        //        Upvote
                        //    </div>
                        //    <div className="control" onClick={null}>
                        //        {/* uncomment img tage and get suitable icon */}
                        //        {/* <img className="action" src={govtIcon} alt='govt' /> */}
                        //        Downvote
                        //    </div>
                        //</span>
                    }
                </div>
            </div>
        );
    }
}

export default SPCard;