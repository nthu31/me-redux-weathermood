import React from 'react';
import { connect } from 'react-redux';
import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import FutureWeathers from 'components/FutureWeathers.jsx';
import { getFutureWeather } from 'actions/action.js';
import { getDateList } from 'utilities/utility.js';

import './Forecast.css';


class Forecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: getDateList(new Date().getDay())
        };
        this.getFutureWeather = this.getFutureWeather.bind(this);
    }

    render() {
        return (
            <div className={`forecast ${this.props.tomorrowGroup}`}>
                <div className={`overlay ${this.props.masking ? 'maskingOn':'maskingOff'}`}>
                    <WeatherDisplay temp={this.props.tomorrowTemp} description={this.props.tomorrowDescription}
                            group={this.props.tomorrowGroup} tomorrow={true}/>
                    <FutureWeathers futureTemps={this.props.futureTemps} dates={this.state.dates}/>
                    <WeatherForm city={this.props.city} unit={this.props.unit} getWeather={this.getFutureWeather}/>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getFutureWeather(this.props.city, this.props.unit);
    }

    getFutureWeather(city, unit) {
        this.props.dispatch(getFutureWeather(city, unit));
    }
}

export default connect(state => {
    return {
        ...state.cityUnitReducer,
        ...state.forecastWeatherReducer,
        ...state.loadMaskReducer
    };
})(Forecast)
