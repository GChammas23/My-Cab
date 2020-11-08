import React, { Component } from 'react';
import { updateUserPass } from '../actions/users.actions';
import NavbarComponent from './Navbar';

class ResetPass extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', confPassword: '' };
    }

    componentDidMount() {
        let user_username;
        if (localStorage.length !== 0) {
            user_username = localStorage.getItem("username");
            this.setState({ isLoggedIn: true });
        }
        else if (sessionStorage.length !== 0) {
            user_username = sessionStorage.getItem("username");
            this.setState({ isLoggedIn: true });
        }
        this.setState({ username: user_username });
    }

    handlePasswordChange = event => {
        event.preventDefault();
        this.setState({ password: event.target.value });
    }

    handleConfPasswordChange = event => {
        event.preventDefault();
        this.setState({ confPassword: event.target.value });
    }

    changePass = event => {
        event.preventDefault();

        //Check if both passwords have the required length
        if ((this.state.password.length >= 8 && this.state.password.length <= 20) &&
            (this.state.confPassword.length >= 8 && this.state.confPassword.length <= 20)) {
            //Check if both passwords match
            if (this.state.password === this.state.confPassword) {
                updateUserPass({ username: this.state.username, password: this.state.password }).then(res => {
                    alert("Password updated successfully!");
                    this.props.history.push("/Home");

                }).catch(error => {
                    alert("An error occured while trying to update your password: " + error);
                })
            }
            else {
                alert("Please make sure that both passwords match!");
            }
        }
        else {
            alert("Please make sure that the passwords meet the length criteria!");
        }
    }

    render() {
        return (
            <div className="App">
                <NavbarComponent history={this.props.history} />
                <div className="home-body">
                    <h1>Change password for: </h1>
                    <p style={{ color: "red", fontSize: "27px" }}>{this.state.username}</p>
                </div>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={this.changePass} method="POST">
                            <div className="form-group row">
                                <label className="form-label">Password:</label>
                                <input className="form-control" type="password" id="password" aria-describedby="passwordHelpBlock" name="password" placeholder='Enter password' required size="10" onChange={this.handlePasswordChange} /><br />
                                <small id="passwordHelpBlock" className="pass-text">
                                    Your password must contain between 8 to 20 characters.
                                </small>
                            </div>
                            <div className="form-group row">
                                <label className="form-label">Confirm password:</label>
                                <input className="form-control" type="password" id="confPassword" aria-describedby="confasswordHelpBlock" name="confPassword" placeholder='Confirm password' required size="10" onChange={this.handleConfPasswordChange} /><br />
                                <small id="confpasswordHelpBlock" className="pass-text">
                                    Please make sure to match both passwords!
                                </small>
                            </div>
                            <input className="btn bg-primary text-light" type="submit" value="Proceed" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResetPass;