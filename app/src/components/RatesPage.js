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
        this.formatData = this.formatData.bind(this);
        this.state = { data: [], currencyCode: '', buttonDisabled: true };
    }

    componentDidMount() {
        //Fill up the data array in state
        this.getAllRates();
    }

    getAllRates() {
        getRates().then(response => {
            this.formatData(response.rates);
        })
    }

    formatData(data) {
        let result = [];
        let fetchedData = Object.entries(data);
        for (let i = 0; i < fetchedData.length; i++) {
            for (let j = 0; j < fetchedData[i].length; j += 2) {
                let rate = {
                    rate_code: fetchedData[i][j],
                    rate_value: fetchedData[i][j + 1],
                }
                result.push(rate);
            }
        }
        this.setState({data: result});
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
                this.getAllRates();
            }
        });
    }

    searchForCurrency = event => {
        event.preventDefault();
        let targetCurrency = this.state.currencyCode;
        getRates(targetCurrency).then(response => {
            this.formatData(response.rates);
        }).catch(error => {
            console.log(error);
        })
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
                    <BootstrapTable data={this.state.data} striped hover condensed pagination >
                        <TableHeaderColumn dataField='rate_code' isKey={true}>Code</TableHeaderColumn>
                        <TableHeaderColumn dataField='rate_value'>Value</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                <Footer />
            </div>
        )
    }

}

export default RatesPage;