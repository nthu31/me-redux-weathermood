import {
    getWeather as getWeatherFromApi,
    getWeatherByCoor as getWeatherByCoorFromApi,
    getFutureWeather as getFutureWeatherFromApi
} from 'api/open-weather-map.js';


const changeCityUnit = (city, unit) => {
    return {
        type: '@CHANGE_CITY_UNIT',
        city,
        unit
    };
};

const changeLoading = (load) => {
    return {
        type: '@CHANGE_LOADING',
        loading: load
    };
};

const changeMasking = (mask) => {
    return {
        type: '@CHANGE_MASKING',
        masking: mask
    };
};

const endGetWeather = (code, group, description, temp) => {
    return {
        type: '@TODAY/END_GET_WEATHER',
        code,
        group,
        description,
        temp
    };
};

const resetWeather = () => {
    return {
        type: '@TODAY/RESET_WEATHER'
    };
};

const endGetFutureWeather = (tomorrowCode, tomorrowGroup, tomorrowDescription, tomorrowTemp, futureTemps, futureGroups) => {
    return {
        type: '@FORECAST/END_GET_WEATHER',
        tomorrowCode,
        tomorrowGroup,
        tomorrowDescription,
        tomorrowTemp,
        futureTemps,
        futureGroups
    };
};

const resetFutureWeather = () => {
    return {
        type: '@FORECAST/RESET_WEATHER'
    };
};

export const getWeather = (city, unit) => {
    return (dispatch, state) => {
        dispatch(changeCityUnit(city, unit));
        dispatch(changeLoading(true));
        dispatch(changeMasking(true));
        getWeatherFromApi(city, unit)
            .then(data => {
                let {code, group, description, temp} = data;
                dispatch(endGetWeather(code, group, description, temp));
                dispatch(changeLoading(false));
            }).catch(err => {
                console.log(err);
                dispatch(changeCityUnit('na', 'na'));
                dispatch(resetWeather());
                dispatch(changeLoading(false));
            });
        setTimeout(() => {
            dispatch(changeMasking(false));
        }, 600);
    };
};

export const getWeatherByCoor = (lat, lon, unit) => {
    return (dispatch, state) => {
        dispatch(changeLoading(true));
        dispatch(changeMasking(true));
        getWeatherByCoorFromApi(lat, lon, unit)
            .then(data => {
                let {city, code, group, description, temp, unit} = data;
                dispatch(changeCityUnit(city, unit));
                dispatch(endGetWeather(code, group, description, temp));
                dispatch(changeLoading(false));
            }).catch(err => {
                console.log(err);
                dispatch(changeCityUnit('na', 'na'));
                dispatch(resetWeather());
                dispatch(changeLoading(false));
            });
        setTimeout(() => {
            dispatch(changeMasking(false));
        }, 600);
    };
};

export const getFutureWeather = (city, unit) => {
    return (dispatch, state) => {
        dispatch(changeCityUnit(city, unit));
        dispatch(changeLoading(true));
        dispatch(changeMasking(true));
        getFutureWeatherFromApi(city, unit)
            .then(data => {
                let {tomorrowCode, tomorrowGroup, tomorrowDescription, tomorrowTemp, futureTemps, futureGroups} = data;
                dispatch(endGetFutureWeather(tomorrowCode, tomorrowGroup, tomorrowDescription, tomorrowTemp, futureTemps, futureGroups));
                dispatch(changeLoading(false));
            }).catch(err => {
                console.log(err);
                dispatch(changeCityUnit('na', 'na'));
                dispatch(resetFutureWeather());
                dispatch(changeLoading(false));
            });
        setTimeout(() => {
            dispatch(changeMasking(false));
        }, 600);
    };
};
