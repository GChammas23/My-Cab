import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap'
import { getUserRides } from '../actions/rides.action';
import NavbarComponent from './Navbar';
import Footer from './Footer';
import '../App.css';

let moment = require('moment');

class RidesTable extends Component {
    constructor(props) {
        super(props);
        this.sortRidesByDate = this.sortRidesByDate.bind(this);
        this.priceFormat = this.priceFormat.bind(this);
        this.dateFormat = this.dateFormat.bind(this);
        this.deleteFormat = this.deleteFormat.bind(this);
        this.deleteRide = this.deleteRide.bind(this);
        this.state = { username: '', data: [], rides: [] };
    }

    componentDidMount() {
        let user_username;
        if (localStorage.length !== 0) {
            //Get username from localstorage
            user_username = localStorage.getItem("username");
        }
        else {
            user_username = sessionStorage.getItem("username");
        }
        console.log(user_username);
        this.setState({ username: user_username });

        //Fill array of rides of the user by calling the actions method
        getUserRides({ user_username }).then(res => {
            console.log(res.res);
            this.setState({ data: res.res });
            this.sortRidesByDate(this.state.data);
        }).catch(err => {
            alert("Unable to load user rides" + err);
        });
    }

    sortRidesByDate(ridesArray) {
        let rideHistory = [];
        for (let i = 0; i < ridesArray.length; i++) {
            let date = moment(ridesArray[i].ride_date).toDate();
            if (date < new Date()) {
                rideHistory.push(ridesArray[i]);
            }
        }
        this.setState({ rides: rideHistory });
    }

    dateFormat(cell) {
        return moment(cell).format("YYYY-MM-DD");
    }

    priceFormat(cell) {
        return "$" + cell;
    }

    deleteRide(data) {
        console.log(data);
        this.props.history.push("/Delete", {
            type: "ride",
            data: data,
        });
    }

    deleteFormat(cell, row) {
        console.log(row);
        return (
            <Button className="btn btn-danger" size="xs" onClick={() => this.deleteRide(row)}>Delete</Button>
        )
    }

    render() {
        return (
            <div className="App">
                <NavbarComponent history={this.props.history} location={this.props.location} />
                <div className="home-body">
                    <h2>Rides history</h2>
                    <p>Below are all the rides that you had made with us! Click on the ride date column to sort the rides</p>
                </div>
                <div className="table-bg">
                    <BootstrapTable data={this.state.rides} striped hover condensed pagination search>
                        <TableHeaderColumn isKey={true} dataField='_id'>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='start_address'>Start address</TableHeaderColumn>
                        <TableHeaderColumn dataField='destination_address'>Destination address</TableHeaderColumn>
                        <TableHeaderColumn dataField='ride_date' dataFormat={this.dateFormat} dataSort={true}>Ride date</TableHeaderColumn>
                        <TableHeaderColumn dataField='ride_price' dataFormat={this.priceFormat}>Ride price</TableHeaderColumn>
                        <TableHeaderColumn dataFormat={this.deleteFormat}>Delete</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                <Footer />
            </div>
        )
    }
}

export default RidesTable;