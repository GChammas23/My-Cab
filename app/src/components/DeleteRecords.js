import Alert from 'react-bootstrap/Alert';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { deleteUserRecord } from '../actions/rides.action';

class DeleteRecord extends Component {
    constructor(props) {
        super(props);
        this.deleteRecord = this.deleteRecord.bind(this);
        this.state = { show: true, object: null, type: '' };
    }

    componentDidMount() {
        this.setState({ type: this.props.location.state.type });
        this.setState({ object: this.props.location.state.data });
    }

    setShow = event => {
        event.preventDefault();
        this.setState({ show: false });
        if (this.state.type === "reservation") {
            this.props.history.push("/Reservations");
        }
        else if (this.state.type === "ride") {
            this.props.history.push("/Rides");
        }
    }

    deleteRecord = event => {
        event.preventDefault();
        console.log(this.state.type);
        console.log(this.state.object);

        deleteUserRecord({ data: this.state.object }).then(res => {
            alert("Reservation successfully deleted!");
            if (this.state.type === "reservation") {
                this.props.history.push("/Reservations");
            }
            else if (this.state.type === "ride") {
                this.props.history.push("/Rides");
            }

        }).catch(error => {
            alert("An error occured while deleting your reservation: " + error);
        });

    }

    render() {
        let alertTitle;
        let alertMessage;
        if (this.state.type === "reservation") {
            alertTitle = "Delete reservation?"
            alertMessage = "Are you sure you would like to delete your reservation? You won't be riding with us anymore 🙁"
        }
        else if (this.state.type === "ride") {
            alertTitle = "Delete ride?";
            alertMessage = "Are you sure you would like to delete your ride? You won't be able to see that ride in your history"
        }
        return (
            <Alert show={this.state.show} variant="danger">
                <Alert.Heading>{alertTitle}</Alert.Heading>
                <p>
                    {alertMessage}
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={this.setShow} variant="outline-success">
                        Cancel
                    </Button>
                    <br />
                    <Button onClick={this.deleteRecord} variant="dark">Delete</Button>
                </div>
            </Alert>
        )


    }
}

export default DeleteRecord;