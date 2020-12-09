import React, { Component } from 'react';
import '../App.css';
import NavbarComponent from './Navbar';
import Footer from './Footer';
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

class AboutUs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <NavbarComponent history={this.props.history} />
                <div className="home-body">
                    <h1>About Us</h1>
                    <p>My cab is a web application created by Gabriel Chammas on 20 october 2020. This web application allows
                    it's users to be able to book cab rides straight from their browsers allowing for faster booking and processing.
                    Even though this web app will not be deployed at the moment for optimization and deisgn purposes. We promise to
                    design this app in a more professional way and integrate more features in the application in the future. But for now
                    enjoy the app! <span>😊</span>
                    </p>
                </div>
                <div className="contact-us">
                    <h1>Contact us!</h1>
                    <p>We would me more than glad to receive input from our users so we could give you the best experience that we can.</p>
                    <p><FontAwesomeIcon icon={faAt} /> Email:<a href="mailto: gabrielchammas23@gmail.com">gabrielchammas23@gmail.com</a></p>
                    <p> Check us out on: <FontAwesomeIcon icon={faFacebook} size="2x" />, <FontAwesomeIcon icon={faInstagram} size="2x" /> {"&"} <FontAwesomeIcon icon={faLinkedinIn} size="2x" /></p>
                </div>
                <Footer />
            </div>
        )
    }
}

export default AboutUs;