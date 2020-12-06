import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap'
import NavbarComponent from './Navbar';
import Footer from './Footer';
import '../App.css';
import { connect } from 'react-redux';
import recordsAction from '../redux/actions/records';

let moment = require('moment');

class RidesTable extends Component {
    constructor(props) {
        super(props);
        this.priceFormat = this.priceFormat.bind(this);
        this.dateFormat = this.dateFormat.bind(this);
        this.deleteFormat = this.deleteFormat.bind(this);
        this.deleteRide = this.deleteRide.bind(this);
        this.state = { username: '', data: [], rides: [] };
    }

    componentDidMount() {
        let user_username = localStorage.getItem("username") ? localStorage.getItem("username") : sessionStorage.getItem("username");
        this.setState({ username: user_username }, () => {
            this.getRides();
        });

    }

    async getRides() {
        await this.props.dispatch(recordsAction.getUserRides({ user_username: this.state.username }));
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
                    <BootstrapTable data={this.props.rides} striped hover condensed pagination search>
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

const mapStateToProps = state => ({
    rides: state.recordReducer.rides,
})

export default connect(mapStateToProps)(RidesTable);