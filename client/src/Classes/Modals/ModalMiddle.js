import { Modal, Button } from 'react-bootstrap';
import React, { Component } from 'react';

class ModalMiddle extends Component {
    render() {

        let btnAccept = { 
            "paddingRight": "1.2em", 
            "paddingLeft": "1.2em", 
            "backgroundColor": "lightgreen",
            "color": "black",
            "fontWeight": "500",
        }

        return (
            <Modal show={this.props.show} onHide={this.props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton style={{"padding": "1.8em", "paddingBottom": "0.5em"}}>
                    <Modal.Title id="contained-modal-title-vcenter">
                    {this.props.content.head}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{"padding": "2em"}}>
                    {this.props.content.body}<br />
                    <p style={{ "fontSize": "0.7em" }}>
                        Terms and Conditions apply. If Service Provider accepts the job, then it 
                        is their responsibility to reachout to customer. Our site just serves as a portal
                        and not a mediator. In case of work not being done, the service provider is 
                        held accountable and might even lead to deletion of his account.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide} style={{ "paddingRight": "1em", "paddingLeft": "1em" }}>Close</Button>
                    {(!this.props.content.isSelected)?
                        <Button onClick={this.props.accept} style={btnAccept}>Accept</Button>
                    :null}
                </Modal.Footer>
            </Modal>
        );
    }
}
  
export default ModalMiddle;