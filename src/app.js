const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const PORT = process.env.PORT || 8080

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') 

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Radu'
	})
})



app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Radu'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address'
		})
	}

	geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
		if (error) {
			return res.send({ error })
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error })
			}

			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			})
		})
	})
})

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		})
	}

	console.log(req.query);	
	res.send({
		products: []
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Radu'
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage:'This help article is not found',
		name: 'Radu'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage:'Page not found',
		name: 'Radu'
	})
})



app.listen(PORT, () => {
	console.log(`Server is up on port ${PORT}`);
})