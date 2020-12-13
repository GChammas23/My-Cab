import React, { Component } from 'react';
import '../App.css';
import Footer from './Footer';
import NavbarComponent from './Navbar';
import ReusableTable from './ReusableTable';

class Reservations extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };
    }
    componentDidMount() {
    };

    render() {
        return (
            <div className="App">
                <NavbarComponent history={this.props.history} />
                <div className="home-body">
                    <h2>Your reservations</h2>
                    <p>Check your upcoming reservations you have with us! You can sort the reservations by date or price.</p>
                </div>
                <div className="table-bg">
                    <ReusableTable table="reservations" history={this.props.history}></ReusableTable>
                </div>
                <Footer />
            </div>
        )
    };
}

export default Reservations;