let now = new Date();
let currentDate = document.querySelector("#current-date");

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

currentDate.innerHTML = `${day} ${month} ${date}, ${hour}:${minute}`;

function searchResult(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let location = document.querySelector("#location-entered");
  if (searchInput.value) {
    location.innerHTML = `${searchInput.value}`;
  } else {
    location.innerHTML = null;
  }
}

let locationEntered = document.querySelector("#search-form");
locationEntered.addEventListener("submit", clickSubmit);

function clickSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");

  search(city.value);
}

function search(city) {
  let apiKey = "1266ad07b66517497b1acf79ea5a6a64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function displayWeather(response) {
  console.log(response);
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("span#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let cityElement = document.querySelector("#location-entered");
  cityElement.innerHTML = `${city}`;
}

function displayCurrentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let h1 = document.querySelector("span#temperature");
  h1.innerHTML = `${temperature}`;
  let h2Name = document.querySelector("#location-entered");
  h2Name.innerHTML = `${city}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1266ad07b66517497b1acf79ea5a6a64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#btn-secondary");
currentButton.addEventListener("click", getCurrentPosition);

function convertToFahrenheit(event) {
  event.preventDefault();
  temperature = document.querySelector("#temperature");
  temperature.innerHTML = 68;
}
function converttoCelsius(event) {
  event.preventDefault();
  temperature = document.querySelector("#temperature");
  temperature.innerHTML = 20;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", converttoCelsius);

search("New York");
