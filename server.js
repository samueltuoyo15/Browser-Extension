import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicDir = path.join(__dirname, 'public')

app.use(express.static(publicDir))
app.enable('trust proxy')
app.get('/weather', async (req, res) => {
    try {
        const ip = req.ip
        console.log(req.ip)
        const geoResponse = await fetch(`https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_TOKEN}`)
        const geoData = await geoResponse.json()
        const city = geoData.city
        console.log(city)
        const API_KEY = process.env.API_KEY
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
        const weatherResponse = await fetch(apiUrl)
        const weatherData = await weatherResponse.json()

        console.log(weatherData)
        res.json(weatherData)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'))
})

const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
