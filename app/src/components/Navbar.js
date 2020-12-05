import React, { Component } from 'react';
import '../App.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

class NavbarComponent extends Component {
    constructor(props) {
        super(props);
        this.logOutUser = this.logOutUser.bind(this);
        this.state = { username: '' };
    }

    componentDidMount() {
        this.getUsernameFromStorage();
    };

    getUsernameFromStorage() {
        let user_username;
        if (localStorage.getItem("username")) {
            user_username = localStorage.getItem('username');
        }
        else {
            user_username = sessionStorage.getItem('username');
        }

        this.setState({ username: user_username });
    }

    logOutUser() {
        if (localStorage.length !== 0) {
            //Log out the user and delete all info from localstorage
            localStorage.clear();
        }
        else {
            sessionStorage.clear();
        }


        this.props.history.push('/');
    }

    rideForm = event => {
        event.preventDefault();
        this.props.history.push("/RideForm", {
            operation: "add",
            data: null,
        })
    }

    render() {
        return (
            <Navbar fixed="top" bg="light" expand="xl">
                <Navbar.Brand href="/Home">My Cab</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={this.rideForm} className="nav-link">Book a ride</Nav.Link>
                        <Nav.Link href="/Reservations">Your reservations</Nav.Link>
                        <Nav.Link href="/Rides">Your rides</Nav.Link>
                        <Nav.Link href="/Pricings">Pricings</Nav.Link>
                        <NavDropdown title="Account" id="basic-nav-dropdown">
                            <NavDropdown.Item>{this.state.username}</NavDropdown.Item>
                            <NavDropdown.Item href="/ResetPassword">Change password</NavDropdown.Item>
                            <NavDropdown.Item href="/DeleteAccount">Delete account</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={this.logOutUser}>Log out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav.Link href="/AboutUs">About us</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavbarComponent;