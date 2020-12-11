import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NavbarComponent from './Navbar';
import Footer from './Footer';
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { getRates } from '../actions/prices.action';

class RatesPage extends Component {
    constructor(props) {
        super(props);
        this.getAllRates = this.getAllRates.bind(this);
        this.state = { data: [], currencyCode: '', buttonDisabled: true };
    }

    componentDidMount() {
        //Fill up the data array in state
        this.getAllRates();
    }

    getAllRates() {
        getRates().then(response => {
            this.setState({ data: response.rates })
        })
    }

    handleCodeChange = event => {
        event.preventDefault();
        this.setState({ currencyCode: event.target.value }, () => {
            if (this.state.currencyCode.length > 1 && this.state.currencyCode.length < 3) {
                this.setState({ buttonDisabled: true });
            }
            else if (this.state.currencyCode.length === 3) {
                this.setState({ buttonDisabled: false });
            }
            else if (this.state.currencyCode.localeCompare("")) {
                console.log("hi");
                this.getAllRates();
            }
        });
    }

    searchForCurrency = event => {
        event.preventDefault();
        let targetCurrency = this.state.currencyCode;
        getRates(targetCurrency).then(response => {
            this.setState({ data: response.rates })
        }).catch(error => {
            console.log(error);
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
                    <h2>Rates listing</h2>
                    <p>Below is the table of the rates of different currencies. Please note that the base currency is <strong style={{ color: "red" }}>EUR</strong></p>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Enter a currency code to search for it"
                            onChange={this.handleCodeChange}
                            type="text"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary"
                                onClick={this.searchForCurrency}
                                disabled={this.state.buttonDisabled}>Search</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
                <div className="table-bg">
                    <BootstrapTable data={this.props.prices} striped hover condensed pagination >
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

export default RatesPage;