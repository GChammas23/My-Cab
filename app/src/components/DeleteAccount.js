import Alert from 'react-bootstrap/Alert';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { deleteUser } from '../actions/users.actions';
import { deletUserData } from '../actions/rides.action';

class DeleteAccount extends Component {
    constructor(props) {
        super(props);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.state = { show: true, username: '', password: '' };
    }

    componentDidMount() {
        let user_username;
        let pass;

        if (localStorage.length !== 0) {
            user_username = localStorage.getItem("username");
            pass = localStorage.getItem("password");
        }
        else {
            user_username = sessionStorage.getItem("username");
            pass = sessionStorage.getItem("password");
        }

        this.setState({ username: user_username });
        this.setState({ password: pass });
    }

    setShow = event => {
        event.preventDefault();
        this.setState({ show: false });
        this.props.history.push("/Home");
    }

    deleteAccount = event => {
        event.preventDefault();
        //Create an object from the state

        let account = {
            username: this.state.username,
            pass: this.state.password,
        };

        deletUserData(account).then(res => {
            console.log(res);
            deleteUser(account).then(res => {
                alert("Your account has been successfully deleted. Redirecting to login....");
                if (localStorage.length !== 0 || sessionStorage.length !== 0) {
                    localStorage.clear();
                    sessionStorage.clear();
                }
                this.props.history.push("/");
            }).catch(err => {
                alert("An error occured while deleting the user " + err);
            })
        }).catch(err => {
            alert("An error occured while delete the user's data! " + err);
        })

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

export default DeleteAccount;