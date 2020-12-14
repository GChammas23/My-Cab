import React, { Component } from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';
let moment = require('moment');


class ReusableTable extends Component {
    constructor(props) {
        super(props);
        this.getColumnNames = this.getColumnNames.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);
        this.editRecord = this.editRecord.bind(this);
        this.state = { username: '', headers: [], data: [] };
    }

    componentDidMount() {
        let data = this.props.data;
        this.setState({ data }, () => {
            this.getColumnNames();
        })
    }

    getColumnNames() {
        let headers = Object.keys(this.state.data[0]);
        this.setState({ headers });
    }

    deleteRecord(obj) {
        console.log(obj);
        this.props.history.push("/Delete", {
            type: (this.props.type === "ride") ? "ride" : "reservation",
            data: obj,
        })
    }

    editRecord(obj) {
        console.log(obj);
        this.props.history.push("/RideForm", {
            operation: "edit",
            data: obj,
        })
    }

    render() {
        let headerRows = [];
        let dataRows = [];
        let editRow, editHeader;

        if (this.props.isEditable === true) {
            editHeader = <th>Edit</th>
        }

        this.state.headers.forEach((element, key) => {
            if (element !== "user_username") {
                headerRows.push(<th key={key}>{element}</th>)
            }
        });
        if (editHeader !== undefined) {
            headerRows.push(editHeader)
        }
        headerRows.push(<th key={headerRows.length + 1}>Delete</th>)

        for (let i = 0; i < this.state.data.length; i++) {
            const element = this.state.data[i];
            if (this.props.isEditable === true) {
                editRow = <td><Button className="btn btn-primary" size="xs" onClick={() => this.editRecord(element)}>Edit</Button></td>
            }
            dataRows.push(<tr key={i}>
                <td>{element._id}</td>
                <td>{element.start_address}</td>
                <td>{element.destination_address}</td>
                <td>{"$" + element.ride_price}</td>
                <td>{moment(element.ride_date).format("DD-MM-YYYY")}</td>
                <td>{element.ride_driver}</td>
                {editRow}
                <td><Button className="btn btn-danger" size="xs" onClick={() => this.deleteRecord(element)}>Delete</Button></td>
            </tr>)

        }

        return (
            <table className="Table">
                <thead>
                    <tr className="Table-header">
                        {headerRows}
                    </tr>
                </thead>
                {dataRows}
            </table>
        )
    }
}

export default ReusableTable;