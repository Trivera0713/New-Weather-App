let now = new Date();
console.log(now);

let today = document.querySelector(".date");

let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "Novemeber",
  "Decemeber",
];
let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();

if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

today.innerHTML = `${day}, ${month} ${date}, ${year} ${hour} : ${minutes}`;

function showForecast() {
  let forecast = document.querySelector("#weekly-forecast");
  let forecastHTML = `<div class="row">`;

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
        <div class="forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="60"
        />
        <div class="forecast-temperatures">
          <span class="temperature-max"> 18° </span> |
          <span class="temperature-min"> 12° </span>
        </div>
      </div>  `;
  });
  forecastHTML = forecastHTML + `</div`;
  forecast.innerHTML = forecastHTML;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city");
  console.log(searchInput.value);
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please type a city!");
  }
  let apiKey = "c03face7caa58a9b7ffa9f52b7238a93";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=Imperial`;
  console.log(apiUrl);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getWeather);
}
let form = document.querySelector("form");
form.addEventListener("submit", search);

function getWeather(response) {
  let temper = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = `${temper}`;
  let description = document.querySelector(".tempDescription");
  description.innerHTML = response.data.weather[0].description;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} Mph`;
  let feel = document.querySelector("#feel");
  feel.innerHTML = `Feels Like: ${Math.round(response.data.main.feels_like)}°`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  fahrenheitTemp = temper;
}

function myLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let units = "imperial";
  let apiKey = "c03face7caa58a9b7ffa9f52b7238a93";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(getWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}

showForecast();

let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", getCurrentLocation);
