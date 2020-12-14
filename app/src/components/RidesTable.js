import React, { Component } from 'react';
import NavbarComponent from './Navbar';
import Footer from './Footer';
import '../App.css';
import { connect } from 'react-redux';
import recordsAction from '../redux/actions/records';
import ReusableTable from './ReusableTable';

let moment = require('moment');

class RidesTable extends Component {
    constructor(props) {
        super(props);
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

    render() {
        let table;
        if (this.props.rides.length !== 0) {
            table = <ReusableTable data={this.props.rides} history={this.props.history} type={"ride"}></ReusableTable>

        }
        return (
            <div className="App">
                <NavbarComponent history={this.props.history} location={this.props.location} />
                <div className="home-body">
                    <h2>Rides history</h2>
                    <p>Below are all the rides that you had made with us!</p>
                </div>
                <div className="table-bg">
                    {table}
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