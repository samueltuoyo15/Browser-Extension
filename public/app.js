async function setRandomBackground() {
    try {
        const response = await fetch('/getRandomImages')
        const data = await response.json()
        const imageUrl = data.urls.full
        document.body.style.backgroundImage = `url(${imageUrl})`
    } catch (error) {
        console.error('Error fetching the background image:', error)
    }
}

setRandomBackground()
setInterval(() => {
    const date = new Date()
    const currentTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    const hours = date.getHours()
    const time = document.getElementById('time-element')
    const text = document.querySelector('#showcase h3')

    time.textContent = currentTime

    if (hours >= 18) {
        text.textContent = 'Good Evening,'
    } else if (hours >= 12) {
        text.textContent = 'Good Afternoon,'
    } else if (hours >= 6) {
        text.textContent = 'Good Morning,'
    } else {
        text.textContent = 'Good Night,'
    }
}, 100)

const searchInput = document.querySelector('input')

searchInput.addEventListener('change', () => {
    const query = encodeURIComponent(searchInput.value)
    window.location.replace(`https://www.google.com/search?q=${query}`)
})

const fetchWeatherTemperature = () => {
    fetch('/weather')
        .then(response => response.json())
        .then(data => {
            console.log(data) 
            const temp = data.current.temp_c
            const weatherTemp = document.querySelector('.weather-temp span')
            weatherTemp.innerHTML = temp
        })
        .catch(error => console.error('Error fetching weather data:', error))
}

fetchWeatherTemperature()

