import axios from 'axios';

const myKey = '1d6f82a58d552e466d55c4300492538f';
const basicURL = `https://api.openweathermap.org/data/2.5/weather?appid=${myKey}`;

const forecastBasicURL = 'http://api.openweathermap.org/data/2.5/forecast/daily?';

function getGroup(code) {
    let group = 'na';
    if(code >= 200 && code < 300) group = 'thunderstorm';
    else if(code >= 300 && code < 400) group = 'drizzle';
    else if(code >= 500 && code < 600) group = 'rain';
    else if(code >= 600 && code < 700) group = 'snow';
    else if(code >= 700 && code < 800) group = 'atmosphere';
    else if(code == 800) group = 'clear';
    else if(code >800) group = 'clouds';
    return group;
}

export function getWeather(city, unit) {
    return axios.get(`${basicURL}&q=${city}&units=${unit}`)
        .then(res => {
            return {
                city: city,
                code: res.data.weather[0].id,
                group: getGroup(res.data.weather[0].id),
                description: capitalize(res.data.weather[0].description),
                temp: Math.round(res.data.main.temp),
                unit: unit
            };
        }).catch(err => {
            throw err;
        });
}

export function getWeatherByCoor(lat, lon, unit) {
    return axios.get(`${basicURL}&lat=${lat}&lon=${lon}&units=${unit}`)
        .then(res => {
            return {
                city: res.data.name,
                code: res.data.weather[0].id,
                group: getGroup(res.data.weather[0].id),
                description: capitalize(res.data.weather[0].description),
                temp: Math.round(res.data.main.temp),
                unit: unit
            };
        }).catch(err => {
            throw err;
        });
}

export function getFutureWeather(city, unit) {
    return axios.get(`${forecastBasicURL}q=${city}&cnt=5&units=${unit}&appid=${myKey}`)
        .then(res => {
            return {    //Tomorrow weather is at index 0
                city: city,
                tomorrowCode: res.data.list[0].weather[0].id,
                tomorrowGroup: getGroup(res.data.list[0].weather[0].id),
                tomorrowDescription: capitalize(res.data.list[0].weather[0].description),
                tomorrowTemp: Math.round(res.data.list[0].temp.day),
                unit: unit,
                futureTemps: res.data.list.map(futureData => {
                    return Math.round(futureData.temp.day);
                }),
                futureGroups: res.data.list.map(futureData => {
                    return getGroup(futureData.weather[0].id);
                })
            };
        }).catch(err => {
            throw err;
        });
}

export function capitalize(string) {
    return string.replace(/\b\w/g, l => l.toUpperCase());
}
