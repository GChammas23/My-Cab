import Alert from 'react-bootstrap/Alert';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { deleteUser } from '../actions/users.actions';
import { deletUserData } from '../actions/rides.action';
import { connect } from 'react-redux';
import userAction from '../redux/actions/users';
import recordsAction from '../redux/actions/records';

class DeleteAccount extends Component {
    constructor(props) {
        super(props);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.state = { show: true, username: '', password: '' };
    }

    componentDidMount() {
        let user_username = localStorage.getItem("username") ? localStorage.getItem("username") : sessionStorage.getItem("username");
        let pass = localStorage.getItem("password") ? localStorage.getItem("password") : sessionStorage.getItem("password");

        this.setState({ username: user_username });
        this.setState({ password: pass });
    }

    setShow = event => {
        event.preventDefault();
        this.setState({ show: false });
        this.props.history.push("/Home");
    }

    async deleteAccount(event) {
        event.preventDefault();
        //Create an object from the state

        let account = {
            username: this.state.username,
            pass: this.state.password,
        };

        await this.props.dispatch(recordsAction.deleteUserData(account));

        if(this.props.recordsDeleted){
            await this.props.dispatch(userAction.deleteUser(account));
            if(this.props.accountDeleted){
                alert("Account successfully deleted! You will be redirected to the login page.");
                localStorage.clear();
                sessionStorage.clear();
                this.props.history.push("/");
            }
            else{
                alert("An error occured while trying to delete your account!");
            }
        }
        else{
            alert("An error occured while trying to delete the records related to your account!");
        }

    }

    render() {
        return (
            <Alert show={this.state.show} variant="danger">
                <Alert.Heading>Delete your account?</Alert.Heading>
                <p>
                    Are you sure you would like to delete your account? This action is irreversible and permanent!
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={this.setShow} variant="outline-success">
                        Cancel
                    </Button>
                    <br />
                    <Button onClick={this.deleteAccount} variant="dark">Delete my account</Button>
                </div>
            </Alert>
        )
    }
}

const mapStateToProps = state => ({
    accountDeleted: state.userReducer.accountDeleted,
    recordsDeleted: state.recordReducer.recordsDeleted,
})

export default connect(mapStateToProps)(DeleteAccount);