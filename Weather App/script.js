const url = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "f00c38e0279b7bc85480c3fe775d518c";

async function weatherfn() {
	const city = document.getElementById('city-input').value;
	try {
		const response = await fetch(`${url}?q=${city}&appid=${apiKey}`);
		const data = await response.json()

		if(!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		} else{
			showWeather(data);
		}
	}
	catch(error) {
		console.log('Error fetching weather data:', error)
	}
}

function showWeather(data){

		document.getElementById('city-name').textContent = data.name;

		document.getElementById('date').textContent = moment().format('MMMM Do YYYY, h:mm:ss a');

		document.getElementById('temperature').innerHTML = `${data.main.temp}°C`;

		document.getElementById('description').textContent = data.weather[0].description;

		document.getElementById('wind-speed').innerHTML = `Wind Speed: ${data.wind.speed} m/s`


	const weatherInfo = document.getElementById('weather-info');
	if (weatherInfo) {
		weatherInfo.style.display = 'block';
	}
}
