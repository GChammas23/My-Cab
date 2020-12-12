import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NavbarComponent from './Navbar';
import Footer from './Footer';
import ReusableDropdown from './ReusableDropdown';
import { InputGroup, Button } from 'react-bootstrap'
import { getRates, getSymbols } from '../actions/prices.action';

class RatesPage extends Component {
    constructor(props) {
        super(props);
        this.getAllRates = this.getAllRates.bind(this);
        this.formatData = this.formatData.bind(this);
        this.getAllSymbols = this.getAllSymbols.bind(this);
        this.state = { data: [], symbols: [], selectedSymbol: '' };
    }

    componentDidMount() {
        //Fill up the data array in state
        this.getAllRates();
        this.getAllSymbols();
    }

    getAllRates() {
        getRates().then(response => {
            this.formatData(response.rates, "rates");
        })
    }

    getAllSymbols() {
        getSymbols().then(response => {
            let symbols = Object.keys(response.symbols);
            this.setState({ symbols });
        })
    }

    handleSymbolChange = (selectedItem) => {
        this.setState({ selectedSymbol: selectedItem });
    }

    formatData(data, type) {
        if (type === "rates") {
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
            this.setState({ data: result });
        }
        else if (type === "symbols") {
            /*let formattedSymbols = [];
            let fetchedSymbols = Object.keys(data);
            fetchedSymbols[0] = "Choose a currency";
            for (let i = 0; i < fetchedSymbols.length; i++) {
                if (i === 0) {
                    formattedSymbols.push(<option key={i} value="">{fetchedSymbols[i]}</option>)
                }
                else {
                    formattedSymbols.push(<option key={i} value={fetchedSymbols[i]}>{fetchedSymbols[i]}</option>)
                }
            }
            this.setState({ symbols: formattedSymbols });
            */
        }
    }

    searchForCurrency = event => {
        event.preventDefault();
        let targetCurrency = this.state.selectedSymbol;
        if (targetCurrency.length === 0) {
            getRates().then(response => {
                this.formatData(response.rates, "rates")
            }).catch(error => {
                console.log(error);
            })
        }
        else {
            getRates(targetCurrency).then(response => {
                this.formatData(response.rates, "rates");
            }).catch(error => {
                console.log(error);
            })
        }
    }

    render() {
        let dropdown;
        if (this.state.symbols.length !== 0) {
            dropdown = <ReusableDropdown data={this.state.symbols} defaultOption="Choose a currency" width='1000' onChange={this.handleSymbolChange}></ReusableDropdown>
        }
        return (
            <div className="App">
                <NavbarComponent history={this.props.history} location={this.props.location} />
                <div className="home-body">
                    <h2>Rates listing</h2>
                    <p>Below is the table of the rates of different currencies. Please note that the base currency is <strong style={{ color: "red" }}>EUR</strong></p>
                    <InputGroup className="mb-3">
                        {dropdown}
                        <InputGroup.Append>
                            <Button variant="outline-secondary"
                                onClick={this.searchForCurrency}>Search</Button>
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