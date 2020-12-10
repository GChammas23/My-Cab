import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import actions from '../redux/actions/users';


class CreateUser extends Component {
    constructor(props) {
        super(props);
        const clientID = '680623846718-6uhe7mj085j9di8uq6nba1olk7s31dl3.apps.googleusercontent.com'; //Client id for google auth
        this.insertNewUser = this.insertNewUser.bind(this);
        this.googleSuccess = this.googleSuccess.bind(this);
        this.state = { Name: '', Age: 0, Username: '', Password: '', ConfPassword: '', clientId: clientID, checkPass: false, passType: "password", checkConfPass: false, confPassType: "password" };
    }

    componentDidMount() {
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

    handlePassBoxChange = async (event) => {
        if (event.target.name === "seePass") {
            let checkPass = event.target.checked;
            this.setState({ checkPass }, () => {
                if (checkPass) {
                    this.setState({ passType: "text" });
                }
                else {
                    this.setState({ passType: "password" });
                }
            });
        }
        else if (event.target.name === "seeConfPass") {
            let checkConfPass = event.target.checked;
            this.setState({ checkConfPass }, () => {
                if (checkConfPass) {
                    this.setState({ confPassType: "text" });
                }
                else {
                    this.setState({ confPassType: "password" });
                }
            })
        }
    }

    async googleSuccess(res) {
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

        await this.props.dispatch(actions.findUsername({username: this.state.Username}));

        if (this.props.usernameFound) {
            alert("An account with this google account is already created! please consider logging in instead!");
        }
        else {
            await this.props.dispatch(actions.createUser(user));

            if (this.props.didCreate) {
                alert("Account created! Your username is: " + user.Username + " and your password is your family name. Please consider changing your password as soon as possible!");
                localStorage.setItem("username", user.Username);
                localStorage.setItem("password", user.pass);
                this.props.history.push("/Home");
            }
            else {
                alert("An error occured while trying to create an account with the selected google account!");
            }
        }

    }

    googleFail = res => {
        console.log(res);
        alert("Failed to authenticate with google! Consider signing in with our sign up form.")
    }

    async insertNewUser(event) {
        event.preventDefault();
        const { Name } = this.state;
        const { Age } = this.state;
        const { Username } = this.state;
        const { Password } = this.state;
        const { ConfPassword } = this.state;

        let account = {
            name: Name,
            age: Age,
            Username: Username,
            pass: Password,
        }

        //Check if passwords length is valid
        if (Password.length >= 8 && Password.length <= 20) {
            //Check if both passwords are the same
            if (Password === ConfPassword) {
                //Check if username is already in use
                await this.props.dispatch(actions.findUsername({ username: Username }));
                if (this.props.usernameFound) {
                    alert("The username chosen is already in use!");
                }
                else {
                    //Call the actions method
                    await this.props.dispatch(actions.createUser(account));

                    if (this.props.didCreate) {
                        alert("Account successfully created! Redirecting to home page...");
                        sessionStorage.setItem("username", account.Username);
                        sessionStorage.setItem("password", account.pass);
                        this.props.history.push("/Home");
                    }
                    else {
                        alert("An error occured while trying to create the account!");
                    }
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
                                <input className="form-control" type={this.state.passType} id="password" aria-describedby="passwordHelpBlock" name="password" placeholder='Enter password' required size="10" onChange={this.handlePasswordChange} /><br />
                                <small id="passwordHelpBlock" className="pass-text">
                                    Your password must contain between 8 to 20 characters.
                                </small>
                                <label style={{ marginLeft: 525 }}>
                                    See password:
                                    <input name="seePass" type="checkbox" checked={this.state.checkPass} onChange={this.handlePassBoxChange} />
                                </label>
                            </div>
                            <div className="form-group row">
                                <label className="form-label">Confirm password:</label>
                                <input className="form-control" type={this.state.confPassType} id="confPassword" aria-describedby="confasswordHelpBlock" name="confPassword" placeholder='Confirm password' required size="10" onChange={this.handleConfPasswordChange} /><br />
                                <small id="confpasswordHelpBlock" className="pass-text">
                                    Please make sure to match both passwords!
                                </small>
                                <label style={{ marginLeft: 600 }}>
                                    See password:
                                    <input name="seeConfPass" type="checkbox" checked={this.state.checkConfPass} onChange={this.handlePassBoxChange} />
                                </label>
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

const mapStateToProps = state => ({
    usernameFound: state.userReducer.usernameFound,
    didCreate: state.userReducer.didCreate,
})

export default connect(mapStateToProps)(CreateUser);