

//---------------------------------

const getInitCityUnit = {
    city: 'na',
    unit: 'metric'
};

export const cityUnitReducer = (state = getInitCityUnit, action) => {
    switch (action.type) {
        case '@CHANGE_CITY_UNIT':
            return {
                city: action.city,
                unit: action.unit
            };
        default:
            return state
    }
};

//---------------------------------

const getInitLoadMask = {
    loading: true,
    masking: true
};

export const loadMaskReducer = (state = getInitLoadMask, action) => {
    switch (action.type) {
        case '@CHANGE_LOADING':
            return {
                ...state,
                loading: action.loading
            };
        case '@CHANGE_MASKING':
            return {
                ...state,
                masking: action.masking
            };
        default:
            return state;
    }
};

//---------------------------------

const getTodayInitState = {
    code: 'na',
    group: 'na',
    description: 'na',
    temp: 'na'
};

export const todayWeatherReducer = (state = getTodayInitState, action) => {
    switch (action.type) {
        case '@TODAY/END_GET_WEATHER': {
            let {type, ...others} = action;
            return others;
        }
        case '@TODAY/RESET_WEATHER':
            return getTodayInitState;
        default:
            return state;

    }
};

//---------------------------------

const getForecastInitState = {
    tomorrowCode: 'na',
    tomorrowGroup: 'na',
    tomorrowDescription: 'na',
    tomorrowTemp: 'na',
    futureTemps: [],
    futureGroups: []
};

export const forecastWeatherReducer = (state = getForecastInitState, action) => {
    switch (action.type) {
        case '@FORECAST/END_GET_WEATHER': {
            let {type, ...others} = action;
            return others;
        }
        case '@FORECAST/RESET_WEATHER':
            return getForecastInitState;
        default:
            return state;
    }
};
