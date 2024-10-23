// Handle the current time of the person
setInterval(() => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const hours = date.getHours();
    const time = document.getElementById('time-element');
    const text = document.querySelector('#showcase h3');

    time.textContent = currentTime;

    if (hours >= 18) {
        text.textContent = 'Good Evening,';
    } else if (hours >= 12) {
        text.textContent = 'Good Afternoon,';
    } else if (hours >= 6) {
        text.textContent = 'Good Morning,';
    } else {
        text.textContent = 'Good Night,';
    }
}, 1000); // Update every second

// Handle the Search
const searchInput = document.querySelector('input');

searchInput.addEventListener('change', () => {
    const query = encodeURIComponent(searchInput.value);
    window.location.href = `https://www.google.com/search?q=${query}`;
});

// Handle the weather temperature based on the person’s geographical region
const fetchWeatherTemperature = () => {
    fetch('/weather') // Correct the URL by using quotes around /weather
        .then(response => response.json())
        .then(data => {
            const temp = data.current.temp_c;
            const weatherTemp = document.querySelector('.weather-temp span');
            weatherTemp.innerHTML = `${temp}&deg;C`; // Added Celsius symbol
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

fetchWeatherTemperature();
