import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import Footer from './Footer';
import NavbarComponent from './Navbar';
import { addRide, updateUserReservation } from '../actions/rides.action';
import { connect } from 'react-redux';
import pricesAction from '../redux/actions/prices';


class RideForm extends Component {
    constructor(props) {
        super(props);
        this.checkPrice = this.checkPrice.bind(this);
        this.state = {
            operation: null, object: null,
            username: '', start: '', dest: '', price: 0,
            ride_date: new Date(), today_date: new Date(), maxDate: new Date(), proceedDisabled: true,
        };
    }

    componentDidMount() {
        let user_username = localStorage.getItem("username") ? localStorage.getItem("username") : sessionStorage.getItem("username");

        if (this.props.location.state.data !== null) {
            this.setState({ operation: this.props.location.state.operation });
            this.setState({ object: this.props.location.state.data });
            this.setState({ start: this.props.location.state.data.start_address });
            this.setState({ dest: this.props.location.state.data.destination_address });
            this.setState({ price: this.props.location.state.data.ride_price });
            //this.setState({ride_date: this.props.location.state.data.ride_date});
        }

        this.setState({ username: user_username });

        //Set max date
        this.state.maxDate.setDate(this.state.today_date.getDate() + 7);
    }


    handleStartAddress = event => {
        event.preventDefault();
        this.setState({ start: event.target.value });
    }

    handleDestAddress = event => {
        event.preventDefault();
        this.setState({ dest: event.target.value }, () => {
            if(this.state.dest.length === 0){
                this.setState({proceedDisabled: true});
            }
        });
    }

    changeDate = date => {
        this.setState({ ride_date: date })
    }

    insertNewRide = event => {
        event.preventDefault();
        const { start } = this.state;
        const { dest } = this.state;
        const { ride_date } = this.state;
        const { username } = this.state;
        const  price = this.props.ridePrice;

        let ride = {
            start_address: start,
            destination_address: dest,
            ride_price: price,
            user_username: username,
            ride_date: ride_date,
        }

        addRide(ride).then(res => {
            alert("You have successfully booked your ride with us! See you later!");
        }).catch(err => {
            alert("An error occured while trying to add the ride " + err);
        });

    }

    async checkPrice(event) {
        event.preventDefault();
        let start = this.state.start;
        let dest = this.state.dest;

        start = start.charAt(0).toUpperCase() + start.substr(1);
        dest = dest.charAt(0).toUpperCase() + dest.substr(1);

        await this.props.dispatch(pricesAction.getRidePrice({ start: start, dest: dest }));

        if (this.props.ridePrice !== 0) {
            this.setState({ proceedDisabled: false });
        }
        else {
            alert("An error occured while trying to find the price of the ride! Please make sure that the start and destination addresses are valid");
        }

    }

    editRide = event => {
        event.preventDefault();
        const { start } = this.state;
        const { dest } = this.state;
        const { ride_date } = this.state;
        const { username } = this.state;
        const { price } = this.state;

        let ride = {
            start_address: start,
            destination_address: dest,
            ride_price: price,
            username: username,
            ride_date: ride_date
        }

        console.log(ride);

        updateUserReservation(ride).then(res => {
            alert("Ride updated successfully!");
        }).catch(err => {
            alert("An error occured while updating the ride info. " + err);
        })
    }

    render() {
        let button;
        let lable;
        //Dynamic rendering
        if (this.state.operation === "edit") {
            button = <input className="btn bg-primary text-light" type="submit" value="Edit" disabled={this.state.proceedDisabled} onClick={this.editRide} />
            lable = <h1>Edit a ride</h1>
        }
        else {
            button = <input className="btn bg-primary text-light" type="submit" value="Proceed" disabled={this.state.proceedDisabled} onClick={this.insertNewRide} />
            lable = <h1>Book a ride</h1>
        }
        return (
            <div className="App">
                <NavbarComponent history={this.props.history} />
                <div className="home-body">
                    {lable}
                    <p>Ride with us today!</p>
                    <p>Fill all the needed information below in order to book a ride</p>
                </div>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={this.insertNewRide} method="POST">
                            <div className="form-group row">
                                <label className="form-label">Start address</label>
                                <input className="form-control" type="text" id="start" name="start" onChange={this.handleStartAddress} placeholder='Enter your current location' value={this.state.start || ""} required size="8" /><br />
                            </div>
                            <div className="form-group row">
                                <label className="form-label">Destination address</label>
                                <input className="form-control" type="text" id="destination" name="destination" placeholder='Enter the location you want to go to' onChange={this.handleDestAddress} value={this.state.dest || ""} required size="10" /><br />
                            </div>
                            <Calendar className="calendar" onChange={this.changeDate} value={this.state.ride_date} minDate={this.state.today_date} maxDate={this.state.maxDate} />
                            <Button onClick={this.checkPrice} style={{ marginTop: "20px" }}>Check ride price</Button>
                            <div className="form-group row">
                                <label className="form-label">Ride price:</label>
                                <input className="form-control" type="text" id="price" aria-describedby="priceHelpBlock" name="price" readOnly={true} required size="10" value={"$" + this.props.ridePrice || ""} /><br />
                                <small id="priceHelpBlock" className="pass-text">
                                    Click on the above button to see the price
                                </small>
                            </div>
                            {button}
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        )
    };
}

const mapStateToProps = state => ({
    ridePrice: state.pricesReducer.ridePrice,
    recordsDeleted: state.recordReducer.recordsDeleted,
})

export default connect(mapStateToProps)(RideForm);