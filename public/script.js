const searchElement = document.querySelector("[data-city-search]");
const searchBox = new google.maps.places.SearchBox(searchElement);
searchBox.addListener("places_changed", () => {
	const place = searchBox.getPlaces()[0];
	if (place == null) return;
	const latitude = place.geometry.location.lat();
	const longitude = place.geometry.location.lng();
	fetch("/weather", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application.json",
		},
		body: JSON.stringify({
			latitude: latitude,
			longitude: longitude,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			setWeatherData(data, place.formatted_address);
		});
});

const icon = new Skycons({ color: "#111" });
const locationElement = document.querySelector("[data-location]");
const statusElement = document.querySelector("[data-status]");
const temperatureElement = document.querySelector("[data-temperature]");
const precipiationElement = document.querySelector("[data-precipiation]");
const windElement = document.querySelector("[data-wind]");
icon.set("icon", "clear-day");
icon.play();

function setWeatherData(data, place) {
	locationElement.textContent = place;
	statusElement.textContent = data.weather_descriptions;
	temperatureElement.textContent = data.temperature;
	precipiationElement.textContent = `${data.precip * 100}%`;
	windElement.textContent = `${data.wind_speed}mph`;
	// icon.set("icon", data.weather_descriptions);
	// icon.play();
}
