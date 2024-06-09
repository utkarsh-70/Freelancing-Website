import { Modal, Button } from 'react-bootstrap';
import React, { Component } from 'react';

class ModalAlert extends Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.head}</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                            {this.props.body}
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalAlert;