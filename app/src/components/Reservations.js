import React, { Component } from 'react';
import '../App.css';
import Footer from './Footer';
import NavbarComponent from './Navbar';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getUserRides } from '../actions/rides.action';
import { Button } from 'react-bootstrap';

let moment = require("moment");

class Reservations extends Component {
    constructor(props) {
        super(props);
        this.sortRidesByDate = this.sortRidesByDate.bind(this);
        this.dateFormat = this.dateFormat.bind(this);
        this.priceFormat = this.priceFormat.bind(this);
        this.editFormat = this.editFormat.bind(this);
        this.deleteFormat = this.deleteFormat.bind(this);
        this.editReservation = this.editReservation.bind(this);
        this.deleteReservation = this.deleteReservation.bind(this);
        this.state = { username: '', data: [], allRides: [] };
    }
    componentDidMount() {
        let user_username;
        if (localStorage.length !== 0) {
            user_username = localStorage.getItem("username");
        }
        else {
            user_username = sessionStorage.getItem("username");
        }
        this.setState({ username: user_username });

        getUserRides({ user_username: user_username }).then(res => {
            this.setState({ allRides: res.res });
            this.sortRidesByDate(this.state.allRides);
        }).catch(error => {
            console.log("Error occured while fetchind rides " + error);
        });

    };

    sortRidesByDate(ridesArray) {
        let reservations = [];
        for (let i = 0; i < ridesArray.length; i++) {
            let date = moment(ridesArray[i].ride_date).toDate();
            if (date > new Date()) {
                reservations.push(ridesArray[i]);
            }
        }
        this.setState({ data: reservations });
    }

    dateFormat(cell) {
        return moment(cell).format("YYYY-MM-DD");
    }

    priceFormat(cell) {
        return "$" + cell;
    }

    editReservation(data) {
        this.props.history.push("/RideForm", {
            operation: "edit",
            data: data,
        })
    }

    deleteReservation(data) {
        console.log(data);
        this.props.history.push("/Delete", {
            type: "reservation",
            data: data,
        });
    }

    editFormat(cell, row) {
        return (
            <Button className="btn btn-info" size="xs" onClick={() => this.editReservation(row)}>Edit</Button>
        )

    }

    deleteFormat(cell, row) {
        return (
            <Button className="btn btn-danger" size="xs" onClick={() => this.deleteReservation(row)}>Delete</Button>
        )
    }

    render() {
        return (
            <div className="App">
                <NavbarComponent history={this.props.history} />
                <div className="home-body">
                    <h2>Your reservations</h2>
                    <p>Check your upcoming reservations you have with us! You can sort the reservations by date or price.</p>
                </div>
                <div className="table-bg">
                    <BootstrapTable data={this.state.data} striped hover condensed pagination search >
                        <TableHeaderColumn dataField='_id' isKey={true}>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='start_address'>Start address</TableHeaderColumn>
                        <TableHeaderColumn dataField='destination_address'>Destination</TableHeaderColumn>
                        <TableHeaderColumn dataField='ride_date' dataFormat={this.dateFormat} dataSort={true}>Ride Date</TableHeaderColumn>
                        <TableHeaderColumn dataField="ride_price" dataFormat={this.priceFormat} dataSort={true}>Ride price</TableHeaderColumn>
                        <TableHeaderColumn dataFormat={this.editFormat}>Edit</TableHeaderColumn>
                        <TableHeaderColumn dataFormat={this.deleteFormat}>Delete</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                <Footer />
            </div>
        )
    };
}

export default Reservations;