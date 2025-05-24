// OpenWeatherMap API Configuration
const apiKey = '1834b7a63814025e62dc4e99f014ef3d';
const city = 'Porto,PT';
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

// DOM Elements
const weatherDataEl = document.querySelector('.weather-data');
const forecastContainerEl = document.querySelector('.forecast-container');

// Fetch Weather Data
async function getWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error('Weather data not available');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        weatherDataEl.innerHTML = '<p>Weather data currently unavailable</p>';
        forecastContainerEl.innerHTML = '';
    }
}

// Display Current Weather
function displayWeather(data) {
    const current = data.list[0];
    
    weatherDataEl.innerHTML = `
        <div class="current-weather">
            <img src="https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png" 
                 alt="${current.weather[0].description}" width="50" height="50">
            <p>${Math.round(current.main.temp)}°C</p>
            <p>${current.weather[0].description}</p>
            <p>Humidity: ${current.main.humidity}%</p>
        </div>
    `;
    
    displayForecast(data);
}

// Display 3-Day Forecast
function displayForecast(data) {
    forecastContainerEl.innerHTML = '';
    
    // Get unique days (skip current day)
    const forecasts = [];
    const dates = new Set();
    
    for (const item of data.list) {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!dates.has(date) && forecasts.length < 3) {
            dates.add(date);
            forecasts.push(item);
        }
    }
    
    forecasts.forEach(item => {
        const date = new Date(item.dt * 1000);
        forecastContainerEl.innerHTML += `
            <div class="forecast-day">
                <p>${date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" 
                     alt="${item.weather[0].description}" width="40" height="40">
                <p>${Math.round(item.main.temp)}°C</p>
            </div>
        `;
    });
}

// Initialize weather display
document.addEventListener('DOMContentLoaded', getWeather);