import React from 'react';
import { connect } from 'react-redux';
import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import { getWeather, getWeatherByCoor } from 'actions/action.js';

import './Today.css';


class Today extends React.Component {
    constructor(props) {
        super(props);
        this.getWeather = this.getWeather.bind(this);
        this.getWeatherByCoor = this.getWeatherByCoor.bind(this);
    }

    render() {
        return (
            <div className={`today ${this.props.group}`}>
                <div className={`overlay ${this.props.masking ? 'maskingOn':'maskingOff'}`}>
                    <WeatherDisplay temp={this.props.temp} description={this.props.description}
                            group={this.props.group} tomorrow={false}/>
                    <WeatherForm city={this.props.city} unit={this.props.unit} getWeather={this.getWeather}/>
                </div>
            </div>
        );
    }

    componentDidMount() {
        if(this.props.city == 'na') {
            navigator.geolocation.getCurrentPosition((position) => {
                this.getWeatherByCoor(position.coords.latitude, position.coords.longitude, this.props.unit);
            });
        }else {
            this.props.dispatch(getWeather(this.props.city, this.props.unit));
        }
    }

    getWeather(city, unit) {                    //action: getWeather
        this.props.dispatch(getWeather(city, unit));
    }

    getWeatherByCoor(lat, lon, unit) {          //action: getWeatherByCoor
        this.props.dispatch(getWeatherByCoor(lat, lon, unit));
    }
}

export default connect(state => {
    return {
        ...state.cityUnitReducer,
        ...state.todayWeatherReducer,
        ...state.loadMaskReducer
    };
})(Today)
