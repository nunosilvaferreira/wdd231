// scripts/weather.js
document.addEventListener('DOMContentLoaded', function() {
    const weatherContainer = document.getElementById('weather-container');
    const API_KEY = '1834b7a63814025e62dc4e99f014ef3d'; // Replace with your actual API key
    const CITY = 'Porto'; // Default city - you can make this dynamic
    const UNITS = 'imperial'; // 'metric' for Celsius, 'imperial' for Fahrenheit
    
    // Cache DOM elements
    const currentWeatherEl = document.createElement('div');
    const forecastEl = document.createElement('div');
    const errorEl = document.createElement('p');
    
    // Add classes for styling
    currentWeatherEl.className = 'current-weather';
    forecastEl.className = 'weather-forecast';
    errorEl.className = 'weather-error';
    
    // Append elements to container
    weatherContainer.appendChild(currentWeatherEl);
    weatherContainer.appendChild(forecastEl);
    weatherContainer.appendChild(errorEl);
    
    // Fetch weather data
    async function fetchWeather() {
        try {
            // Fetch current weather
            const currentResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=${UNITS}&appid=${API_KEY}`
            );
            
            if (!currentResponse.ok) {
                throw new Error('Failed to fetch current weather');
            }
            
            const currentData = await currentResponse.json();
            
            // Fetch 5-day forecast
            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=${UNITS}&appid=${API_KEY}`
            );
            
            if (!forecastResponse.ok) {
                throw new Error('Failed to fetch forecast');
            }
            
            const forecastData = await forecastResponse.json();
            
            // Process and display data
            displayCurrentWeather(currentData);
            displayForecast(forecastData);
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
            errorEl.textContent = 'Unable to load weather data. Please try again later.';
        }
    }
    
    // Display current weather
    function displayCurrentWeather(data) {
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
        currentWeatherEl.innerHTML = `
            <div class="weather-main">
                <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon">
                <div class="weather-temp">${Math.round(data.main.temp)}°${UNITS === 'metric' ? 'C' : 'F'}</div>
            </div>
            <div class="weather-details">
                <p class="weather-condition">${data.weather[0].main}</p>
                <p class="weather-location">${data.name}, ${data.sys.country}</p>
                <p class="weather-feels-like">Feels like: ${Math.round(data.main.feels_like)}°</p>
                <p class="weather-humidity">Humidity: ${data.main.humidity}%</p>
                <p class="weather-wind">Wind: ${Math.round(data.wind.speed)} ${UNITS === 'metric' ? 'm/s' : 'mph'}</p>
            </div>
        `;
    }
    
    // Display 3-day forecast
    function displayForecast(data) {
        // Group forecast by day
        const dailyForecast = {};
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
            if (!dailyForecast[date]) {
                dailyForecast[date] = {
                    temps: [],
                    icons: [],
                    descriptions: []
                };
            }
            dailyForecast[date].temps.push(item.main.temp);
            dailyForecast[date].icons.push(item.weather[0].icon);
            dailyForecast[date].descriptions.push(item.weather[0].main);
        });
        
        // Get next 3 days (excluding today)
        const forecastDays = Object.keys(dailyForecast).slice(1, 4);
        
        let forecastHTML = '<h3>3-Day Forecast</h3><div class="forecast-days">';
        
        forecastDays.forEach(day => {
            const dayData = dailyForecast[day];
            const avgTemp = Math.round(dayData.temps.reduce((a, b) => a + b, 0) / dayData.temps.length);
            const iconCode = dayData.icons[Math.floor(dayData.icons.length / 2)]; // Use middle icon of the day
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
            const description = mostFrequent(dayData.descriptions);
            
            forecastHTML += `
                <div class="forecast-day">
                    <p class="forecast-weekday">${day}</p>
                    <img src="${iconUrl}" alt="${description}" class="forecast-icon">
                    <p class="forecast-temp">${avgTemp}°${UNITS === 'metric' ? 'C' : 'F'}</p>
                    <p class="forecast-desc">${description}</p>
                </div>
            `;
        });
        
        forecastHTML += '</div>';
        forecastEl.innerHTML = forecastHTML;
    }
    
    // Helper function to find most frequent description
    function mostFrequent(arr) {
        const counts = {};
        arr.forEach(item => {
            counts[item] = (counts[item] || 0) + 1;
        });
        return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    }
    
    // Initialize weather fetch
    fetchWeather();
    
    // Optional: Add refresh button
    const refreshBtn = document.createElement('button');
    refreshBtn.className = 'weather-refresh';
    refreshBtn.innerHTML = '🔄 Refresh';
    refreshBtn.addEventListener('click', fetchWeather);
    weatherContainer.appendChild(refreshBtn);
});