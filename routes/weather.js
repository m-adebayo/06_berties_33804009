const express = require('express')
const router = express.Router();
const request = require('request')

// GET - default page with London weather
router.get('/', (req, res, next) => {
    const apiKey = 'f06f479484397fbbc8fa51414d0851c0'
    const city = 'London'
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    request(url, function (err, response, body) {
        if (err) return next(err)
        const weather = JSON.parse(body)
        res.render('weather.ejs', {
            city: weather.name,
            temp: weather.main.temp,
            humidity: weather.main.humidity,
            windSpeed: weather.wind.speed,
            windDeg: weather.wind.deg,
            description: weather.weather[0].description
        })
    })
})

// POST - fetch weather for user input
router.post('/', (req, res, next) => {
    const apiKey = 'f06f479484397fbbc8fa51414d0851c0'
    const city = req.body.city
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    request(url, function (err, response, body) {
        if (err) return next(err)
        const weather = JSON.parse(body)

        // Check if city was found
        if (weather.cod !== 200) {
            return res.send(`<p>City not found: ${city}</p><a href="/weather">Try again</a>`)
        }

        res.render('weather.ejs', {
            city: weather.name,
            temp: weather.main.temp,
            humidity: weather.main.humidity,
            windSpeed: weather.wind.speed,
            windDeg: weather.wind.deg,
            description: weather.weather[0].description
        })
    })
})

module.exports = router
