const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');

const weatherInfoSection = document.querySelector('.weather-info');
const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');

const countryTxt = document.querySelector('.country-txt');
const tempTxt = document.querySelector('.temp-txt');
const conditionTxt = document.querySelector('.condition-txt');
const humidityValueTxt = document.querySelector('.humidity-value-txt');
const windValueTxt = document.querySelector('.wind-value-txt');
const weatherSummaryImg = document.querySelector('.weather-summary-img');
const currentDateTxt = document.querySelector('.current-date-txt');

const apiKey = 'c8b804d8292e6bf17f3c982422c5a28e'; // Tu API key

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() != '') {
        updateWeatcherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && cityInput.value.trim() != '') {
        updateWeatcherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});

async function getFethData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    return response.json();
}

async function updateWeatcherInfo(city) {
    const weatherData = await getFethData('weather', city);
    if (weatherData.cod !== 200) {
        showDisplaySection(notFoundSection);
        return;
    }

    const {
        name: cityName,
        sys: { country },
        main: { temp, humidity },
        weather: [{ main: condition, icon }],
        wind: { speed }
    } = weatherData;

    countryTxt.textContent = `${cityName}, ${country}`;
    tempTxt.textContent = `Temperature: ${temp}°C`;
    conditionTxt.textContent = `Condition: ${condition}`;
    humidityValueTxt.textContent = `Humidity: ${humidity}%`;
    windValueTxt.textContent = `Wind Speed: ${speed} m/s`;

    weatherSummaryImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherSummaryImg.alt = condition;

    currentDateTxt.textContent = `Date: ${new Date().toLocaleDateString()}`;
    showDisplaySection(weatherInfoSection);
}

function showDisplaySection(section) {
    [weatherInfoSection, searchCitySection, notFoundSection].forEach(sec => sec.style.display = 'none');
    section.style.display = 'flex';
}
document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.querySelector('.search-btn');
    const cityInput = document.querySelector('.city-input');

    if (searchBtn && cityInput) {
        searchBtn.addEventListener('click', () => {
            const city = cityInput.value;
            // Lógica para buscar la ciudad y mostrar los datos del clima
        });
    }
});

