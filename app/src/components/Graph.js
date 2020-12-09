import React, { Component } from 'react';
import '../App.css';
import NavBarComponent from './Navbar';
import Footer from './Footer';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import recordsAction from '../redux/actions/records';

class Graph extends Component {
    constructor(props) {
        super(props);
        this.getRidePrices = this.getRidePrices.bind(this);
        this.state = {
            series: [{
                data: [],
            }],
            options: {
                chart: {
                    type: 'line',
                    height: 350
                },
                stroke: {
                    curve: 'straight',
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    }
                },
                dataLabels: {
                    enabled: false,
                },
                title: {
                    text: 'Rides expense chart',
                    align: 'middle'
                },
                yaxis: {
                    labels: {
                        formatter: function (value) {
                            return "$" + value
                        }
                    }
                }
            },
        };
    }

    componentDidMount() {
        let username = localStorage.getItem("username") ? localStorage.getItem("username") : sessionStorage.getItem("username");
        this.getRidePrices(username);
    }

    async getRidePrices(username) {
        await this.props.dispatch(recordsAction.getUserRidesPrices({ username: username }));
        this.setState({
            series: [{
                name: "Price",
                data: this.props.ridePrices,
            }]
        })
    }


    render() {
        return (
            <div className="App">
                <NavBarComponent history={this.props.history} />
                <div className="home-body">
                    <h1>Your expenses chart</h1>
                    <h6>Find below your expenses in each ride you had with us!</h6>
                </div>
                <div className="card">
                    <div className="card-body">
                        <ReactApexChart type="line" options={this.state.options} series={this.state.series} width={1000} />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ridePrices: state.recordReducer.ridePrices,
})


export default connect(mapStateToProps)(Graph);