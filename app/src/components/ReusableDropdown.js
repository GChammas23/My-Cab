import React, { Component } from 'react';
import '../App.css';

class ReusableDropdown extends Component {
    constructor(props) {
        super(props);
        this.fillDropdown = this.fillDropdown.bind(this);
        this.state = { dropDownData: [], width: 0 };
    }

    componentDidMount() {
        this.fillDropdown();
        let width = parseInt(this.props.width)
        this.setState({ width });
    }

    handleSelectChange = (event) => {
        event.preventDefault();
        let selectedItem = event.target.value;
        this.props.onChange(selectedItem);
    }

    fillDropdown() {
        const { data } = this.props;
        let dropDownData = [];
        data[0] = this.props.defaultOption;
        for (let i = 0; i < data.length; i++) {
            if (i === 0) {
                dropDownData.push(<option key={i} value="">{data[i]}</option>);
            }
            else {
                dropDownData.push(<option key={i} value={data[i]}>{data[i]}</option>);
            }
        }
        console.log(dropDownData);
        this.setState({ dropDownData })
    }

    render() {
        let dropdown;
        if (this.props.selectedItem !== undefined) {
            dropdown = <select style={{ width: this.state.width }} onChange={this.handleSelectChange} value={this.props.selectedItem}>{this.state.dropDownData}</select>

        }
        else {
            dropdown = <select style={{ width: this.state.width }} onChange={this.handleSelectChange}>{this.state.dropDownData}</select>
        }
        return (
            dropdown
        )
    }
}

export default ReusableDropdown;