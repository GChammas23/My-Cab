import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'react-calendar/dist/Calendar.css';
import LoginForm from './components/LoginForm';
import ResetPass from './components/ResetPassword';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import DeleteAccount from './components/DeleteAccount';
import NavbarComponent from './components/Navbar';
import RidesTable from './components/RidesTable';
import RideForm from './components/RideForm';
import AboutUs from './components/AboutUs';
import PricingsTable from './components/PricingsTable';
import Reservations from './components/Reservations';
import DeleteRecords from './components/DeleteRecords';

import { Provider } from 'react-redux';
import { configureStore, configurePersistor } from './redux/store/store';

// Redux setup
const store = configureStore();
const persistor = configurePersistor(store);
const wrapper = document.getElementById("root");

class RouterNavigationSample extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            <>
              <Route
                exact
                path="/"
                render={(props) => <LoginForm {...props} />} />

              <Route path="/Resetpassword" render={(props) => <ResetPass {...props} />} />
              <Route path="/Signup" render={(props) => <SignUp {...props} />} />
              <Route path="/Navbar" render={(props) => <NavbarComponent {...props} />} />
              <Route path="/DeleteAccount" render={(props) => <DeleteAccount {...props} />} />
              <Route path="/Home" render={(props) => <HomePage {...props} />} />
              <Route path="/Rides" render={(props) => <RidesTable {...props} />} />
              <Route path="/RideForm" render={(props) => <RideForm {...props} />} />
              <Route path="/AboutUs" render={(props) => <AboutUs {...props} />} />
              <Route path="/Pricings" render={(props) => <PricingsTable {...props} />} />
              <Route path="/Reservations" render={(props) => <Reservations {...props} />} />
              <Route path="/Delete" render={(props) => <DeleteRecords {...props} />} />
            </>
          </div>
        </Router>
      </Provider>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<RouterNavigationSample />, rootElement);