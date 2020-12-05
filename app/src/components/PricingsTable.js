import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NavbarComponent from './Navbar';
import Footer from './Footer';
import { connect } from 'react-redux';
import pricesAction from '../redux/actions/prices';
class PricingsTable extends Component {
    constructor(props) {
        super(props);
        this.getPrices = this.getPrices.bind(this);
        this.state = { data: [] };
    }

    componentDidMount() {
        //Fill up the data array in state
        this.getPrices();
        console.log(this.props.prices);
    }

    async getPrices() {
        await this.props.dispatch(pricesAction.getPrices());
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
                    <BootstrapTable data={this.props.prices} striped hover condensed pagination search >
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

const mapStateToProps = state => ({
    prices: state.pricesReducer.prices,
})

export default connect(mapStateToProps)(PricingsTable);