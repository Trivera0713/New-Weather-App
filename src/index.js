function formatDate(timestamp) {
  let now = new Date(timestamp);
  console.log(now);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  let year = now.getFullYear();
  return `${day}, ${month} ${date}, ${year} ${hour}: ${minutes}`;
}
function formatDay(timestamp) {
  let date = newDate(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
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
  let apiKey = "f68406t3o5c3f2a4369b987ab457dcba";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getWeather);
}
let form = document.querySelector("form");
form.addEventListener("submit", search);

function getWeather(response) {
  let dateElement = document.querySelector(".date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  let temper = Math.round(response.data.temperature.current);
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = `${temper}`;
  let description = document.querySelector(".tempDescription");
  description.innerHTML = response.data.condition.description;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} Mph`;
  let feel = document.querySelector("#feel");
  feel.innerHTML = `Feels Like: ${Math.round(
    response.data.temperature.feels_like
  )}°`;
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  icon.setAttribute("alt", response.data.condition.description);
  let city = document.querySelector("h1");
  city.innerHTML = response.data.city;
}
function myLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let units = "imperial";
  let apiKey = "f68406t3o5c3f2a4369b987ab457dcba";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(getWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}
function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weekly-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
        <div class="forecast-date">${formatDay(day.time)}</div>
        <img
          src="${day.condition.icon_url}"
          alt=""
          width="60"
        />
        <div class="forecast-temperatures">
          <span class="temperature-max"> ${Math.round(day.temperature.maximum)}°
           </span> |
          <span class="temperature-min"> ${Math.round(day.temperature.minimum)}°
         </span>
        </div>
      </div>  `;
    }
  });
  forecastHTML = forecastHTML + `</div`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);

  getForecast(response.data.coordinates.daily);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let lat = coordinates.latitude;
  let lon = coordinates.longitude;

  let apiKey = "f68406t3o5c3f2a4369b987ab457dcba";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}
let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", getCurrentLocation);
