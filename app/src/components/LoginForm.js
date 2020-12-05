import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { getUser } from '../actions/users.actions';
import { FormCheck } from 'react-bootstrap';
import { connect } from 'react-redux';
import actions from '../redux/actions/users';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = { username: '', password: '', rememberMe: false, passFieldType: "password", seePassToggle: false };
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

    handleCheckBoxChange = event => {
        event.preventDefault();
        this.setState({ rememberMe: event.target.checked });
    };

    handlePassBoxChange = event => {
        event.preventDefault();
        console.log(this.state.seePassToggle);
        if (!this.state.seePassToggle) {
            this.setState({ seePassToggle: true });
            this.setState({ passFieldType: "text" });

        }
        else {
            this.setState({ seePassToggle: false });
            this.setState({ passFieldType: "password" });
        }
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

        if (this.props.didLogin) {
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
                                <input className="form-control" type={this.state.passFieldType} onChange={this.handlePasswordChange} id="pass" name="password" placeholder='Enter password' required size="10" /><br />
                                <FormCheck label="See password" className="passCheckbox" checked={this.state.seePassToggle} onChange={this.handlePassBoxChange} ></FormCheck>
                            </div>
                            <div>
                                <FormCheck checked={this.state.rememberMe} onChange={this.handleCheckBoxChange} label="Remember me"></FormCheck>
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
    didLogin: state.userReducer.didLogin,
})

export default connect(mapStateToProps)(LoginForm);