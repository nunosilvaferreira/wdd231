// OpenWeatherMap API Key - Replace with your actual key
const apiKey = '1834b7a63814025e62dc4e99f014ef3d';
const city = 'Porto,PT';
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

// Fetch weather data
async function getWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.querySelector('.weather-data').innerHTML = '<p>Weather data currently unavailable</p>';
    }
}

// Display current weather
function displayWeather(data) {
    const current = data.list[0];
    const currentDiv = document.querySelector('.weather-data');
    
    currentDiv.innerHTML = `
        <div class="current-weather">
            <img src="https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png" 
                 alt="${current.weather[0].description}">
            <p>${Math.round(current.main.temp)}°C</p>
            <p>${current.weather[0].description}</p>
            <p>Humidity: ${current.main.humidity}%</p>
        </div>
    `;
    
    displayForecast(data);
}

// Display 3-day forecast
function displayForecast(data) {
    const forecastContainer = document.querySelector('.forecast-container');
    forecastContainer.innerHTML = '';
    
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
        forecastContainer.innerHTML += `
            <div class="forecast-day">
                <p>${date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" 
                     alt="${item.weather[0].description}">
                <p>${Math.round(item.main.temp)}°C</p>
            </div>
        `;
    });
}

// Initialize weather display
document.addEventListener('DOMContentLoaded', getWeather);