import React, { Component } from 'react';
import NavbarComponent from './Navbar';
import Footer from './Footer';
import '../App.css';
import ReusableTable from './ReusableTable';


class RidesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
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
                    <ReusableTable table="rides" history={this.props.history}></ReusableTable>
                </div>
                <Footer />
            </div>
        )
    }
}

export default RidesTable;