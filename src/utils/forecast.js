const request = require('postman-request');

const forecast = (long, lat, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=5f946758ea4cf1b31148f94d298668d8&query=${long},${lat}&units=f`

	request( { url, json: true }, (error, {body} = {}) => {
		if (error) {
			callback('Unable to connect to weather service', undefined)
		} else if (body.error) {
			callback(body.error.info)
		} else {
			callback(undefined,`It is currently ${body.current.temperature} degrees out.It fells like ${body.current.feelslike} degress out`)
		}
	})
}

module.exports = forecast