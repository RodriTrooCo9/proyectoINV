//c8b804d8292e6bf17f3c982422c5a28e

'use strict';

const api_key = "c8b804d8292e6bf17f3c982422c5a28e";
/**
*
*@param {string} URL
*@param {Function} callback
*/

export const fetchData = function (URL, callback){
    fetch(`${URL}&appid+${api_key}`)
    .then(res => res.json())
    .then(data => callback(data));
}

export const url = {
    currentWeather(lat, lon){
        return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`
    },
    forecast(lat, lon){
        return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`
    },
    airPollution(lat, lon){
        return `http://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`
    },
    reverseGeo(lat, lon){
        return `http://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`
    },
    /**
*
*@param {string} query lapaz, cocha

*/

    geo(query){
        return `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&`
    }
}
