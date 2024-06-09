import React,{Component} from 'react';
import './EditProfile.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

class EditProfile extends Component{
    constructor(props){
        super(props);

        this.state={
            id: this.props.user._id,
            fname: this.props.user.fname,
            lname: this.props.user.lname,
            address: this.props.user.address,
            city: this.props.user.city,
            state: this.props.user.state,
            pincode: this.props.user.pincode,
            mobile: this.props.user.mobile,
            aadhaar: this.props.user.aadhaar
        }
    }

    updateProfile =() =>{
        fetch("/updateProfile",{
            method: "post",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                id:this.state.id,
                fname: this.state.fname,
                lname: this.state.lname,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                pincode: this.state.pincode,
                mobile: this.state.mobile,
                aadhaar: this.state.aadhaar
            })
        })
        .then(res => res.json())
        .then(data =>{
            window.alert('Profile Successfully updated');
            this.props.setSigninStatus(false,"");
            this.props.setView("Home");
            window.alert('Please Sign in to Continue');
        }).catch((err) => {window.alert(err)});
    }

    render()
    {
        return (
            <div className="profileSetUp form">
                <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridFName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={this.state.fname} required onChange={(input) => this.setState({fname : input.target.value})} required/>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={this.state.lname} onChange={(input) => this.setState({lname : input.target.value})} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control value={this.state.address} onChange={(input) => this.setState({address : input.target.value})} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
            <Form.Group as={Col} controlId="formGridMobile">
              <Form.Label>Mobile No.</Form.Label>
              <Form.Control required value={this.state.mobile} onChange={(input) => this.setState({mobile : input.target.value})} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridAadhaar">
              <Form.Label>Aadhaar No.</Form.Label>
              <Form.Control required  value={this.state.aadhaar} onChange={(input) => this.setState({aadhaar : input.target.value})} />
            </Form.Group>
          </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control value={this.state.city} required onChange={(input) => this.setState({city : input.target.value})}/>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" value={this.state.state} onChange={(input) => this.setState({state : input.target.value})}>
                        <option>Choose...</option>
                        <option>Andhra Pradesh</option>
                        <option>Arunachal Pradesh</option>
                        <option>Assam</option>
                        <option>Bihar</option>
                        <option>Chattisgarh</option>
                        <option>Gujarat</option>
                        <option>Karnataka</option>
                        <option>Kerala</option>
                        <option>Rajasthan</option>
                        <option>TamilNadu</option>
                        <option>Telangana</option>
                        
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Pin Code</Form.Label>
                    <Form.Control value={this.state.pincode} required onChange={(input) => this.setState({pincode : input.target.value})}/>
                </Form.Group>
            </Form.Row>
        <Button variant="primary" type="submit" onClick={this.updateProfile}>Submit</Button>
        </Form>
            </div>
        );
    }
}

export default EditProfile;
