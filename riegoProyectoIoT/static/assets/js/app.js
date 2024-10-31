// assets/js/app.js
import { getDate, getTime, mps_to_kmh, aqiText } from './module.js';

// Usa las funciones donde las necesites
'use strict';
import { fetchData, url } from "./api.js";
import * as module from "./module.js";

/**
* Add event listener on multiple elements
* @param {NodeList} elements Eelements node array
* @param {string} event Type Event Type e.g.: "click", "mouseover"
* @param {Function} callback Callback function
*/
const addEventOnElements = function (elements, eventType, callback) {
for (const element of elements) element.addEventListener(eventType, callback);
}


const searchView = document.querySelector("[data-search-view]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const toggleSearch = () => searchView.classList.toggle("active"); addEventOnElements (searchTogglers, "click", toggleSearch);
/**
* SEARCH INTEGRATION
*/
const searchField = document.querySelector("[data-search-field]");
const searchResult = document.querySelector("[data-search-result]");

let searchTimeout = null;I
const serachTimeoutDuration = 500;

searchField.addEventListener("input", function () {
    searchTimeout ?? clearTimeout(searchTimeout);
    if (!searchField.value) {
    searchResult.classList.remove("active");
    searchResult.innerHTML = "";
    searchField.classList.remove("searching");
    } else {
    searchField.classList.add("searching");
    }

    if (searchField.value) {
        searchTimeout = setTimeout(() => {
            fetchData(url.geo(searchField.value), function (location){
                searchField.classList.remove("searching");
                searchResult.classList.add("active");
                searchResult.innerHTML = `
                <ul class="view-list" data-search-list></ul>
                `;

                const /** {NodeList}  | [] */ item = [];
                for (const {name, lat, lon, country, state} of location){
                    const searchItem = document.createElement("Li");
                    searchItem.classList.add("view-item");

                    searchItem.innerHTML = `
                        <span class="m-icon">location_on</span>

                        <div>
                            <p class="item-title">${name}</p>

                            <p class="label-2 item-subtitle">${state || ""}, ${country}</p>
                        </div>
                        
                        <a href="#/weather?lat=${lat}&lon=${lon}" class="item-link has-state" aria-label="${name} weather"  data-search-toggler ></a>

                    `;

                    searchResult.querySelector("[data-search-list]").appendChild(searchItem);
                    item.push(searchItem.querySelector("data-search-toggler"));
                }

                addEventOnElements(items, "click", function (){
                    toggleSearch();
                    searchResult.classList.remove("active")
                })
            });
        },serachTimeoutDuration);
    }


    });


const container = document.querySelector("[data-container]");
const loading = document.querySelector("[data-loading]");
const currentLocationBtn = document.querySelector("[data-current-location-btn]");

const errorContent = document.querySelector("[data-error-content]");

/**
 *
 * @param {number} lat latitud
 * @param {number} lot longitud
 */


export const updateWeather = function (lat, lon) {

//loading.style.display = "grid";
container.style.overflowY = "hidden";
container.classList.contains("fade-in") ?? container.classList.remove
("fade-in");
errorContent.style.display = "none";

const currentWeatherSection = document.querySelector(" [data-current-weather]");
const highlightSection = document.querySelector("[data-highlights]");
const hourlySection = document.querySelector("[data-hourly-forecast]");
const forecastSection = document.querySelector("[data-5-day-forecast]");
currentWeatherSection.innerHTML = "";
highlightSection.innerHTML = "";
hourlySection.innerHTML = "";
forecastSection.innerHTML = "";

if (window.location.hash === "#/current-location"){
    currentLocationBtn.setAttribute("disabled","");
}else{
    currentLocationBtn.removeAttribute("disabled")
}
fetchData(url.currentWeather (lat, lon), function (currentWeather) {
    const {
    weather,
    dt: dateUnix,
    sys: { sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC },
    main: { temp, feels_like, pressure, humidity },
    visiblity,
    timezone
    } = currentWeather
    const [{ description, icon}] = weather;

    const card = document.createElement("div");
card.classList.add("card", "card-lg", "current-weather-card");
card.innerHTML =`
                    <h2 class="title-2 card-title">Hoy</h2>

                        <div class="weapper">
                            <p class="heading">${parseInt(temp)}&deg; <sup>c</sup></p>

                            <img src="./assets/images/weather_icons/${icon}.png" alt="${description}" width="64" height="64" class="weather-icon">
                        </div>

                        <p class="body-3">${description}</p>

                        <ul class="meta-list">
                        <li class="meta-item">
                            <span class="m-icon">calendar_today</span>
                            <p class="title-3 meta-text">${(module.getDate(dateUnix, timezone))}</p>
                        </li>
                        <li class="meta-item">
                            <span class="m-icon">location_on</span>
                            <p class="title-3 meta-text" data-location></p>
                        </li>
                    </ul>
`;
    });
}

export const error404 = function(){ }