import { Modal, Button, Form } from 'react-bootstrap';
import React, { Component } from 'react';

class ModalDonate extends Component {
    state = {
        body: "Enter amount you would like to donate",
    }

    handleDonate = () => {
        this.setState({ body: "You will be redirected to payment portal. You can now close this dialog box." });
    }

    render() {
        return (
            <Modal size="sm" show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Donate towards community issue</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" /*value="500"*/ min="200" />
                        </Form.Group>
                    </Form>
                    {this.state.body}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}> Close </Button>
                    <Button onClick={this.handleDonate}> Donate </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalDonate;