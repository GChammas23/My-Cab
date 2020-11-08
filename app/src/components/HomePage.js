import React, { Component } from 'react';
import '../App.css';
import Footer from './Footer';
import NavbarComponent from './Navbar';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    bookRide = event => {
        event.preventDefault();
        this.props.history.push("/RideForm", {
            type: "add",
            data: null
        });
    }

    seeReservations = event => {
        event.preventDefault();
        this.props.history.push("/Reservations");
    }

    seeRides = event => {
        event.preventDefault();
        this.props.history.push("/Rides");
    }

    render() {
        return (
            <div className="App">
                <NavbarComponent history={this.props.history} />
                <div className="home-body">
                    <h2>Welcome to My Cab!</h2>
                    <p><i>Always at your service!</i></p>
                    <p>Start by booking a ride with us today, or check your previous rides and reservations you did with us. Navigate within the links in the Navigation bar above.</p>
                </div>
                <div className="card-group">
                    <div className="card" id="home-card" onClick={this.bookRide}>
                        <div className="card-body">
                            <img className="card-img-top" src="card1.png" alt="Taxi 1"></img>
                            <h2>Book a ride</h2>
                            <p>Ride with us now!</p>
                        </div>
                    </div>
                    <div className="card" id="home-card" onClick={this.seeReservations}>
                        <div className="card-body">
                            <img src="card2.jpg" className="card-img-top" alt="Taxi 2"></img>
                            <h2>Your reservations</h2>
                            <p>Check your upcoming reservations</p> 
                        </div>
                    </div>
                    <div className="card" id="home-card" onClick={this.seeRides}>
                        <div className="card-body">
                            <img src="card3.jpg" className="card-img-top" alt="Taxi 3"></img>
                            <h2>Your rides</h2>
                            <p>See your previous rides with us</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default HomePage;