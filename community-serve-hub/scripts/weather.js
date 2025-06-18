// scripts/weather.js

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('weather-container');

  if (!container) return;

  try {
    const city = 'Porto';
    const apiKey = '1834b7a63814025e62dc4e99f014ef3d'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch weather data');

    const data = await response.json();

    const weather = {
      temp: data.main.temp.toFixed(1),
      description: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    };

    container.innerHTML = `
      <div class="weather-widget">
        <img src="${weather.icon}" alt="${weather.description}" loading="lazy" width="64" height="64">
        <p><strong>${city}</strong></p>
        <p>${weather.temp}°C - ${weather.description}</p>
      </div>
    `;
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <div class="alert-error">
        <p>⚠️ Weather data is currently unavailable.</p>
        <p><small>${error.message}</small></p>
      </div>
    `;
  }
});
