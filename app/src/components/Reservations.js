import React, { Component } from 'react';
import '../App.css';
import Footer from './Footer';
import NavbarComponent from './Navbar';
import { connect } from 'react-redux';
import recordsAction from '../redux/actions/records';
import ReusableTable from './ReusableTable';


class Reservations extends Component {
    constructor(props) {
        super(props);
        this.getReservations = this.getReservations.bind(this);
        this.state = { username: '' };
    }
    componentDidMount() {
        let user_username = localStorage.getItem("username") ? localStorage.getItem("username") : sessionStorage.getItem("username");
        this.setState({ username: user_username }, () => {
            this.getReservations();
        });

    };

    async getReservations() {
        await this.props.dispatch(recordsAction.getUserReservations({ user_username: this.state.username }));
    }

    render() {
        let table;
        if (this.props.reservations.length !== 0) {
            table = <ReusableTable isEditable={true} data={this.props.reservations} history={this.props.history} type={"reservations"}></ReusableTable>
        }
        return (
            <div className="App">
                <NavbarComponent history={this.props.history} />
                <div className="home-body">
                    <h2>Your reservations</h2>
                    <p>Check your upcoming reservations you have with us!</p>
                </div>
                <div className="table-bg">
                    {table}
                </div>
                <Footer />
            </div>
        )
    };
}

const mapStateToProps = state => ({
    reservations: state.recordReducer.reservations,
})

export default connect(mapStateToProps)(Reservations);