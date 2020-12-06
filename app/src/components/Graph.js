import React, { Component } from 'react';
import '../App.css';
import NavBarComponent from './Navbar';
import Footer from './Footer';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [{
                data: [1, 2, 3, 4, 5, 6, 6, 8, 9, 0, 10]
            }],
            options: {
                chart: {
                    type: 'bar',
                    height: 350
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
                markers: {
                    hover: {
                        sizeOffset: 4
                    }
                }
            },
        };
    }

    componentDidMount() {
        let username = localStorage.getItem("username") ? localStorage.getItem("username") : sessionStorage.getItem("username");
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
                        <ReactApexChart type="bar" options={this.state.options} series={this.state.series} width={1000} />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

/*const mapStateToProps = state => ({
    values: state.bmiReducer.values,
})
*/

export default Graph;