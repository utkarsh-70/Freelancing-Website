import React,{Component} from 'react';
import './ChangePassword.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class ChangePassword extends Component{

    constructor(props){
        super(props);
        this.state={
            password: "",
            oldPassword: "",
            confirmPassword: ""
        }
    }
    

    componentDidMount() {
        //fetch issue details from backend
        // fetch('/password', {
        //     method: "post",
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         email: this.state.email
        //     })
        // }).then(res => res.json())
        // .then(data => {
        //     this.setState({ passW: data.password });
        //     console.log(data.password)
        // });
    }

    validateCurrPw() {
        return (this.props.user.password === this.state.oldPassword);
    }

    validateNewPw() {
        return (this.state.password===this.state.confirmPassword);
    }

      updatePassword = () => {
          if(this.validateCurrPw()===true)
          {
              if(this.validateNewPw()===true)
              {  console.log(this.props.user.email);
                fetch("/passwordUpdate", {
                    method: "post",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        'email': this.props.user.email,
                        'password': this.state.confirmPassword
                    })
                })
                 .then(res => res.json())
                 .then(data => {
                    
                 }).catch((err)=>{alert(err)});
                window.alert("Successfully updated");
              }
              else
              {
                  window.alert("New Password and Confirmed Password are not matching");
                  this.refs.oldPref.value="";
                  this.refs.newPref.value="";  
                  this.refs.confirmPref.value="";
              }
          }
          else
          {
              window.alert("Current Password is wrong");
              this.refs.oldPref.value="";
              this.refs.newPref.value="";  
              this.refs.confirmPref.value="";
          }
      }

    render()
    {
        return(
        <div>
            <Form>
            <Form.Group controlId="oldPassword">
                <Form.Label className="labelPw">Current Password :</Form.Label>
                <Form.Control className="chgPwEle" type="password" onChange={(input) => this.setState({oldPassword : input.target.value})} ref="oldPref" />
            </Form.Group>
            <Form.Group controlId="newPassword">
                <Form.Label className="labelPw">New Password :</Form.Label>
                <Form.Control className="chgPwEle" type="password" onChange={(input) => this.setState({password : input.target.value})} ref="newPref" />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
                <Form.Label className="labelPw">Confirm Password :</Form.Label>
                <Form.Control className="chgPwEle" type="password"  onChange={(input) => this.setState({confirmPassword : input.target.value})} ref="confirmPref" />
            </Form.Group>
            <Button as="input" type="submit" value="Change Password" onClick={this.updatePassword}/>
            </Form>
        </div>
        );
    }
}

export default ChangePassword;