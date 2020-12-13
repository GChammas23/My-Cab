import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import recordsAction from '../redux/actions/records';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap';
let moment = require('moment');


class ReusableTable extends Component {
    constructor(props) {
        super(props);
        this.dateFormat = this.dateFormat.bind(this);
        this.priceFormat = this.priceFormat.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);
        this.deleteFormat = this.deleteFormat.bind(this);
        this.editFormat = this.editFormat.bind(this);
        this.getRides = this.getRides.bind(this);
        this.getReservations = this.getReservations.bind(this);
        this.editRecord = this.editRecord.bind(this);
        this.state = { username: '' };
    }

    componentDidMount() {
        let tableName = this.props.table;
        let user_username = localStorage.getItem("username") ? localStorage.getItem("username") : sessionStorage.getItem("username");
        this.setState({ username: user_username }, () => {
            if (tableName === "rides") {
                this.getRides();
            }
            else if (tableName === "reservations") {
                this.getReservations();
            }
        });
    }

    dateFormat(cell) {
        return moment(cell).format("YYYY-MM-DD");
    }

    priceFormat(cell) {
        return "$" + cell;
    }

    async getRides() {
        await this.props.dispatch(recordsAction.getUserRides({ user_username: this.state.username }));
    }

    async getReservations() {
        await this.props.dispatch(recordsAction.getUserReservations({ user_username: this.state.username }));
    }

    deleteFormat(cell, row) {
        return (
            <Button className="btn btn-danger" size="xs" onClick={() => this.deleteRecord(row)}>Delete</Button>
        )
    }

    editFormat(cell, row) {
        return (
            <Button className="btn btn-info" size="xs" onClick={() => this.editRecord(row)}>Edit</Button>
        )

    }

    editRecord(data) {
        this.props.history.push("/RideForm", {
            operation: "edit",
            data: data,
        })
    }

    deleteRecord(data) {
        console.log(data);
        this.props.history.push("/Delete", {
            type: (this.props.table === "rides") ? "rides" : "reservation",
            data: data,
        });
    }

    render() {
        let data;
        let editRow;
        if (this.props.table === "rides") {
            data = this.props.rides;

        }
        else if (this.props.table === "reservations") {
            data = this.props.reservations;
        }
        if (this.props.isEditable === "true"){
            editRow = <TableHeaderColumn dataFormat={this.editFormat}>Edit</TableHeaderColumn>
        }
        return (
            <BootstrapTable data={data} striped hover condensed pagination search>
                <TableHeaderColumn isKey={true} dataField='_id'>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='start_address'>Start address</TableHeaderColumn>
                <TableHeaderColumn dataField='destination_address'>Destination address</TableHeaderColumn>
                <TableHeaderColumn dataField='ride_date' dataFormat={this.dateFormat} dataSort={true}>Ride date</TableHeaderColumn>
                <TableHeaderColumn dataField='ride_price' dataFormat={this.priceFormat}>Ride price</TableHeaderColumn>
                <TableHeaderColumn dataField='ride_driver'>Driver</TableHeaderColumn>
                {editRow}
                <TableHeaderColumn dataFormat={this.deleteFormat}>Delete</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

const mapStateToProps = state => ({
    rides: state.recordReducer.rides,
    reservations: state.recordReducer.reservations,
})

export default connect(mapStateToProps)(ReusableTable);