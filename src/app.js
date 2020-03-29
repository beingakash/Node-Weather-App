const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Akash kr'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {

        return res.send({

            error: 'You must provide a search item'

        })
    }

    geocode(req.query.address,(error, {latitude,longitude,location}={}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude,longitude,(error, datanew) => {

            if (error) {
                return res.send({
                    error
                })
            }
            res.send({

                forecast: datanew,
                location:location
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search item'
        })

    }
    console.log(req.query.search)
    res.send({

        products: []
    })
})


app.get('/help', (req, res) => {

    res.send('Help')
})




app.listen(3000, () => {

    console.log('Server is up on the port 3000')
})


