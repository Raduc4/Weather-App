const weatherForm = document.querySelector('.form')
const search = document.querySelector('#search')
const message = document.querySelectorAll('.message')


weatherForm.addEventListener('submit', (e) => {
	const location = search.value
	e.preventDefault();
	message[0].textContent = 'Loading...'
	message[1].textContent = ''
	

	fetch(`http://localhost:8080/weather?address=${location}`).then((res) => {
		res.json().then((data) => {
			if (data.error) {
				message[0].textContent = data.error
			} else {
				message[0].textContent = data.location
				message[1].textContent = data.forecast
			}
		})
	})
})

