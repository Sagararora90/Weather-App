const apiKey = "b033a16b64a949b232c685773ed9995e";
const button = document.getElementById("search");
const input = document.getElementById("city");

button.addEventListener("click", fetchWeatherData);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchWeatherData();
  }
});

function fetchWeatherData() {
  const loc = input.value.trim();
  if (!loc) {
    document.getElementById("weatherOutput").style.display = "block";
    document.getElementById("weatherOutput").innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === 200) {
        displayWeatherData(data);
      } else {
        document.getElementById("weatherOutput").style.display = "block";
        document.getElementById("weatherOutput").innerHTML = "<p>Location not found.</p>";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("weatherOutput").style.display = "block";
      document.getElementById("weatherOutput").innerHTML = "<p>Unable to fetch data.</p>";
    });
}

function displayWeatherData(data) {
  const description = data.weather[0].description;
  const temp = data.main.temp;
  const wind = data.wind.speed;
  const visibility = data.visibility;
  const humidity = data.main.humidity;

  const tempCelsius = (temp - 273.15).toFixed(1);
  const windKph = (wind * 3.6).toFixed(1);
  const visibilityKm = (visibility / 1000).toFixed(1);

  document.getElementById("weatherOutput").style.display = "block";
  document.getElementById("weatherOutput").innerHTML = `
    <div class="weather-card">
      <p>City: ${data.name}</p>
      <p>Weather: ${description}</p>
      <p>Temperature: ${tempCelsius}°C</p>
      <p>Wind Speed: ${windKph} kph</p>
      <p>Visibility: ${visibilityKm} km</p>
      <p>Humidity: ${humidity}%</p>
    </div>`;
    input.value="";
}
