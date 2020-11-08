import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { createUser, getUsers } from '../actions/users.actions';
import { GoogleLogin } from 'react-google-login'

class CreateUser extends Component {
    constructor(props) {
        super(props);
        const clientID = '680623846718-6uhe7mj085j9di8uq6nba1olk7s31dl3.apps.googleusercontent.com'; //Client id for google auth
        this.insertNewUser = this.insertNewUser.bind(this);
        this.checkUsernameUsage = this.checkUsernameUsage.bind(this);
        this.state = { Name: '', Age: 0, Username: '', Password: '', ConfPassword: '', users: [], clientId: clientID };
    }

    componentDidMount() {
        getUsers().then(res => {
            this.setState({ users: res }, () => {
                console.log(res);
            });
        }).catch(err => {
            console.log("Error finding users " + err);
        })
    }

    handleNameChange = event => {
        event.preventDefault();
        this.setState({ Name: event.target.value });
    };

    handleAgeChange = event => {
        event.preventDefault();
        this.setState({ Age: event.target.value });
    };
    handleUsernameChange = event => {
        event.preventDefault();
        this.setState({ Username: event.target.value });
    };

    handlePasswordChange = event => {
        event.preventDefault();
        this.setState({ Password: event.target.value });
    };

    handleConfPasswordChange = event => {
        event.preventDefault();
        this.setState({ ConfPassword: event.target.value });
    };

    checkUsernameUsage() {
        for (let i = 0; i < this.state.users.length; i++) {
            let obj = this.state.users[i];

            console.log(obj);

            if (obj.username === this.state.Username) {
                return true;
            }
        }
        return false;
    }

    googleSuccess = res => {
        console.log(res);

        let user = {
            name: res.profileObj.givenName,
            Username: (res.profileObj.givenName + res.profileObj.familyName),
            pass: res.profileObj.familyName,
        }

        this.setState({ Name: user.name });
        this.setState({ Username: user.Username });
        this.setState({ Password: user.pass });
        this.setState({ ConfPassword: user.pass });

        if (!this.checkUsernameUsage) {
            createUser(user).then(res => {
                alert("Account created! Your username is: " + user.Username + " and your password is: " + user.pass + ". MAKE SURE TO CHANGE YOUR PASSWORD!");
                localStorage.setItem('username', user.Username);
                localStorage.setItem('password', user.pass);
                this.props.history.push("/Home");
            }).catch(err => {
                alert("An error occured while logging in using google " + err);
            })
        }
        else {
            alert("An account with this google account is already created!")
        }

    }

    googleFail = res => {
        console.log(res);
        alert("Failed to authenticate with google! Consider signing in with our sign up form.")
    }

    insertNewUser = event => {
        event.preventDefault();
        const { Name } = this.state;
        const { Age } = this.state;
        const { Username } = this.state;
        const { Password } = this.state;
        const { ConfPassword } = this.state;

        //Check if passwords length is valid
        if (Password.length >= 8 && Password.length <= 20) {
            //Check if both passwords are the same
            if (Password === ConfPassword) {
                //Check if username is already in use
                if (this.checkUsernameUsage()) {
                    alert("The username chosen is already in use!");
                }
                else {
                    //Call the actions method
                    createUser({
                        name: Name,
                        age: Age,
                        Username: Username,
                        pass: Password,
                    }).then(res => {
                        if (sessionStorage.length !== 0 || localStorage.length !== 0) {
                            sessionStorage.clear();
                            localStorage.clear();
                        }
                        alert("Account created successfully!");
                        this.props.history.push('/');
                    }).catch((err) => {
                        alert("An error occured while trying to add the user " + err);
                    })
                }

            }
            else {
                alert("The passwords entered do not match!");
            }
        }
        else {
            alert("The password should have 8 to 20 characters!");
        }

    };

    render() {
        return (
            <div className="App">
                <div className="home-body">
                    <h1>Create an account</h1>
                    <h6>Please fill the form below to sign up</h6>
                    <Link className="App-link" to="/"> Go back </Link>
                </div>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={this.insertNewUser} method="POST">
                            <div className="form-group row">
                                <label className="form-label">Name:</label>
                                <input className="form-control" type="text" onChange={this.handleNameChange} id="name" name="name" placeholder='Enter name' required size="10" /><br />
                            </div>
                            <div className="form-group row">
                                <label className="form-label">Age:</label>
                                <input className="form-control" type="text" id="age" name="age" onChange={this.handleAgeChange} placeholder='Enter age' required size="10" /><br />
                            </div>
                            <div className="form-group row">
                                <label className="form-label">Username:</label>
                                <input className="form-control" type="text" id="username" name="username" placeholder='Enter username' required size="10" onChange={this.handleUsernameChange} /><br />
                            </div>
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
                            <input className="btn bg-primary text-light" type="submit" value="Sign up" />
                        </form>
                        <GoogleLogin clientId={this.state.clientId} onSuccess={this.googleSuccess} onFailure={this.googleFail} buttonText="Continue with google" />
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateUser;