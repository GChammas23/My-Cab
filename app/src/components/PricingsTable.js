import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NavbarComponent from './Navbar';
import Footer from './Footer';
import { getPrices } from '../actions/prices.action';

class PricingsTable extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount() {
        //Fill up the data array in state
        getPrices().then(res => {
            this.setState({ data: res });
        }).catch(err => {
            console.log("Unable to load prices " + err);
        })
    }

    priceFormat(cell, row) {
        console.log(row);
        return "$" + cell;
    }

    render() {
        return (
            <div className="App">
                <NavbarComponent history={this.props.history} location={this.props.location} />
                <div className="home-body">
                    <h2>Pricings listing</h2>
                    <p>Below is the table of the pricings of our rides. Click on the price column to sort the results</p>
                </div>
                <div className="table-bg">
                    <BootstrapTable data={this.state.data.res} striped hover condensed pagination search >
                        <TableHeaderColumn dataField='Price_id' isKey={true}>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='start_address'>Start address</TableHeaderColumn>
                        <TableHeaderColumn dataField='dest_address'>Destination address</TableHeaderColumn>
                        <TableHeaderColumn dataField='price' dataFormat={this.priceFormat} dataSort={true}>Ride price</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                <Footer />
            </div>
        )
    }

}

export default PricingsTable;