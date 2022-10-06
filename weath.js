let time = new Date();
let currentDate = document.querySelector(".currentDate");
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[time.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[time.getMonth()];
let date = time.getDate();
let hour = time.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = time.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentDate.innerHTML = ` ${day} ${month} ${date}, ${hour}:${minutes}`;

function showWeatherConditions(response) {
  console.log(response.data);
  document.querySelector("#state").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#cold").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#mxtemp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#mntemp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function search(city) {
  let apiKey = "4f6cf25474a5a19fbc7e223d4d67cea8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherConditions);
}

function processSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityy");
  let city = cityInput.value;
  search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", processSearch);

function showPosition(position) {
  let apiKey = "4f6cf25474a5a19fbc7e223d4d67cea8";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherConditions);
}

function showMyLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let myLocationButton = document.querySelector("#location");
myLocationButton.addEventListener("click", showMyLocation);

search("Dundee");
