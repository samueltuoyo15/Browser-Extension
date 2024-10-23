import http from 'http'
import url from 'url'
import path from 'path'
import fs from 'fs/promises'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config();

const API_KEY = process.env.API_KEY

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript'
};

const filename = url.fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const publicDir = path.join(dirname, 'public')

const app = http.createServer(async (req, res) => {
    try {
        if (req.url === '/weather') {
            const city = 'Warri'
            const apiUrl = process.env.END_POINT

            const weatherResponse = await fetch(apiUrl)
            const weatherData = await weatherResponse.json()

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(weatherData))
            return
        }
        let filepath = path.join(publicDir, req.url === '/' ? 'index.html' : req.url)
        const fileStat = await fs.stat(filepath)
        
        if (fileStat.isFile()) {
            const extname = path.extname(filepath)
            const mimeType = mimeTypes[extname] || 'application/octet-stream'
            res.writeHead(200, { 'Content-Type': mimeType })
            const data = await fs.readFile(filepath)
            res.end(data)
        } else{
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end('Not Found')
        }
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' })
        res.end('Internal Server Error')
    }
});

app.listen(process.env.PORT, () => {
    console.log('App is running on http://localhost:' + process.env.PORT);
});
