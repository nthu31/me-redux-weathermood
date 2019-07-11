import React from 'react';
import {
    Form,
    Button,
    Input,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import './WeatherForm.css';
import {capitalize} from 'api/open-weather-map.js';


export default class WeatherForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            inputCity: '',
            unit: 'metric',
        };
        this.toggle = this.toggle.bind(this);
        this.changeUnit = this.changeUnit.bind(this);
        this.changeInputCity = this.changeInputCity.bind(this);
        this.getWeather = this.getWeather.bind(this);
    }

    render() {
        return (
            <Form className='form'>
                <Input type='text' className='inputCity' name='city' value={this.state.inputCity} onChange={this.changeInputCity}/>
                <ButtonDropdown className='inputUnit' isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>&deg;&nbsp;{this.state.unit=='metric'? 'C' : 'F'}</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => this.changeUnit('metric')}>&deg;C</DropdownItem>
                        <DropdownItem onClick={() => this.changeUnit('Imperial')}>&deg;F</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
                <Button className='submit btn btn-info' type='button' onClick={() =>
                    this.getWeather(capitalize(this.state.inputCity), this.state.unit)}>Check</Button>
            </Form>
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            inputCity: nextProps.city,
            unit: nextProps.unit
        });
    }

    getWeather(city, unit) {
        this.props.getWeather(city, unit);
    }

    toggle() {
        this.setState((prevState, props) => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    changeUnit(unit) {
        this.setState({
            unit: unit
        });
    }

    changeInputCity(e) {
        this.setState({
            inputCity: e.target.value
        });
    }
}
