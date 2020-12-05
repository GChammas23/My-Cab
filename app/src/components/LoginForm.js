import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../redux/actions/users';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = { username: '', password: '', rememberMe: false, passType: "password", checkPass: false };
    }

    componentDidMount() {
        if (localStorage.getItem("username")) {
            this.props.history.push("/Home");
        }
    }

    handleUsernameChange = event => {
        event.preventDefault();
        this.setState({ username: event.target.value });
    };

    handlePasswordChange = event => {
        event.preventDefault();
        this.setState({ password: event.target.value });
    };

    handleCheckBoxChange = async (event) => {
        let rememberMe = event.target.checked;
        this.setState({ rememberMe });
    };

    handlePassBoxChange = async (event) => {
        let checkPass = event.target.checked;
        this.setState({ checkPass }, () => {
            if (checkPass) {
                this.setState({ passType: "text" });
            }
            else {
                this.setState({ passType: "password" });
            }
        })
    };
    async handleLogin(event) {
        event.preventDefault();
        const { username } = this.state;
        const { password } = this.state;

        let account = {
            username: username,
            password: password
        };

        if (this.state.rememberMe) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
        }
        else {
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('password', password);
        }

        await this.props.dispatch(actions.getUser(account));

        if (this.props.accountFound) {
            this.props.history.push("/Home");
        }
        else {
            alert("The username or password entered are invalid!");
        }

    }


    render() {
        return (
            <div className="App">
                <img src="App-logo.png" id="logo_image" alt="App logo"></img>
                <div className="card">
                    <div className="card-body">
                        <h1 className="card-title">Log in</h1>
                        <h6>Please enter your username and password to login</h6>
                        <form onSubmit={this.handleLogin} method="POST" className="">
                            <div className="form-group row">
                                <label className="form-label">Username:</label>
                                <input className="form-control" type="text" onChange={this.handleUsernameChange} id="username" name="username" placeholder='Enter username' required size="10" /><br />
                            </div>
                            <div className="form-group row">
                                <label className="form-label">Password:</label>
                                <input className="form-control" type={this.state.passType} onChange={this.handlePasswordChange} id="pass" name="password" placeholder='Enter password' required size="10" /><br />
                                <label className="passCheckbox">
                                    See password:
                                    <input name="seePass" type="checkbox" checked={this.state.checkPass} onChange={this.handlePassBoxChange} />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Remember me
                                    <input name="remember" type="checkbox" checked={this.state.rememberMe} onChange={this.handleCheckBoxChange} />
                                </label>
                            </div>
                            <input className="btn bg-primary text-light" type="submit" value="Login" />
                            <h6>Don't have an account? <Link className="App-link" to="/Signup">Click here to start!</Link></h6>
                        </form>
                    </div>
                </div>
            </div>
        )
    };
}

const mapStateToProps = state => ({
    accountFound: state.userReducer.accountFound,
})

export default connect(mapStateToProps)(LoginForm);