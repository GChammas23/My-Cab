import React, { Component } from 'react';
import NavbarComponent from './Navbar';
import { connect } from 'react-redux';
import actions from '../redux/actions/users';

class ResetPass extends Component {
    constructor(props) {
        super(props);
        this.changePass = this.changePass.bind(this);
        this.state = { username: '', password: '', confPassword: '', checkPass: false, checkConfPass: false, passType: 'password', confPassType: 'password' };
    }

    componentDidMount() {
        let user_username = localStorage.getItem("username") ? localStorage.getItem("username") : sessionStorage.getItem("username");
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

    async changePass(event) {
        event.preventDefault();

        const { password } = this.state;
        const { confPassword } = this.state;
        const { username } = this.state;

        //Check if both passwords have the required length
        if ((password.length >= 8 && password.length <= 20) &&
            (confPassword.length >= 8 && confPassword.length <= 20)) {
            //Check if both passwords match
            if (password === confPassword) {
                await this.props.dispatch(actions.updatePass({ username: username, password: password }));

                if (this.props.didUpdate) {
                    alert("Your password has been successfully updated!");
                    this.props.history.push('/Home');
                }
                else {
                    alert("An error occured while trying to update your password");
                }
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
                            <input className="btn bg-primary text-light" type="submit" value="Proceed" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    didUpdate: state.userReducer.didUpdate,
})

export default connect(mapStateToProps)(ResetPass);