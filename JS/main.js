const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
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
  "November",
  "December",
];
const searchInput = document.getElementById("searchInput");
const findBtn = document.getElementById("findBtn");
const today = document.getElementById("today");
const currentWeather = document.getElementById("currentWeather");
const tomorrow = document.getElementById("tomorrow");
const tomorrowWeather = document.getElementById("tomorrowWeather");
const the_day_after = document.getElementById("the_day_after");
const thedayafterWeather = document.getElementById("thedayafterWeather");
const map = document.getElementById("map");
(function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
  }
})();
function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  getWeatherApi(lat + "," + lon);
}
$(function () {
  $(".loader").fadeOut(1000, function () {
    $(".loading").fadeOut(1000, function () {
      $("body").css("overflow", "auto");
      $(".loading").remove();
    });
  });
});

// API Link
// Set default value
getWeatherApi("Cairo");

function displayMap(city) {
  map.innerHTML = `
  <div class="container">
  <div class="rounded-3 overflow-hidden mb-3" style="width: 100%">
      <iframe
        width="100%"
        height="600"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${city}&amp;t=&amp;z=7&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
      </iframe>
    </div>
  </div>`;
}

async function getWeatherApi(city) {
  try {
    let http = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=79bfff5c2aea4f6295f142203240901&q=${city}&days=3`
    );

    if (http.ok && http.status !== 400) {
      let response = await http.json();
      displayCity(response.location, response.current);
      displayNext(response.forecast.forecastday);
      displayMap(city);
    } else {
      console.log("Something wrong happened");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

searchInput.addEventListener("keyup", function () {
  getWeatherApi(searchInput.value);
});
findBtn.addEventListener("click", function () {
  getWeatherApi(searchInput.value);
});
// Display weather variables
function displayCity(data, temp) {
  const currentDate = new Date();
  today.innerHTML = `<div class="day"> <p>${
    days[currentDate.getDay()]
  }</p></div>
  <div class="date"><p>${currentDate.getDate()} ${
    monthNames[currentDate.getMonth()]
  }</p> </div>`;
  currentWeather.innerHTML = `<div class="city"><p> ${data.name} ,${data.region}</p></div>  
  <div class="forecast-degree d-flex align-content-center justify-content-center">
    <div class="num" id="num"><p>${temp.temp_c}<sup>o</sup>C</p></div>
    <div class="icon" id="icon"><img  src="${temp.condition.icon}"  class='w-100'/></div>
  </div> 
  <div class="forecast-status text-center"> <p> ${temp.condition.text} </p></div>
  <div class="forecast-foot text-center">
    <span> <i class="fa-solid fa-umbrella"></i> ${temp.cloud} % </span>
    <span> <i class="fa-solid fa-wind"></i> ${temp.wind_kph} km/h </span>
    <span> <i class="fa-regular fa-compass"></i>${temp.wind_dir}</span>
  </div>`;
}

function displayNext(forecast) {
  // Tomorrow Begin
  const tomorrowDate = new Date();
  tomorrow.innerHTML = `
  <div class="day"> <p>${days[tomorrowDate.getDay() + 1]}</p></div>
  <div class="date"><p>${tomorrowDate.getDate() + 1} ${
    monthNames[tomorrowDate.getMonth()]
  }</p> </div> `;

  tomorrowWeather.innerHTML = `
  <div class='forecast-degree mt-5 d-flex align-content-center justify-content-center'>
    <div class='num'> <p> ${forecast[1].day.maxtemp_c}<sup>o</sup>C </p>  </div>
    <div class='icon'> <img src='${forecast[1].day.condition.icon}'  class='w-100'  /> </div>
  </div>
  <div>
    <p> ${forecast[1].day.mintemp_c}<sup>o</sup>C </p>
  </div>
  <div class="status text-center"> <p> ${forecast[1].day.condition.text}</p> </div>
  <div class="forecast-foot text-center">
    <span> <i class="fa-solid fa-umbrella"></i> ${forecast[1].day.daily_chance_of_rain} % </span>
    <span> <i class="fa-solid fa-wind"></i> ${forecast[1].day.maxwind_kph} km/h </span>
  </div>
  `;
  // Tomorrow End

  // The_day_after Begin
  const tda = new Date();
  the_day_after.innerHTML = `
  <div class="day"> <p>${days[tda.getDay() + 2]}</p></div>
  <div class="date"><p>${tda.getDate() + 2} ${
    monthNames[tda.getMonth()]
  }</p> </div> `;

  thedayafterWeather.innerHTML = `
  <div class='forecast-degree mt-5 d-flex align-content-center justify-content-center'>
    <div class='num'> <p> ${forecast[2].day.maxtemp_c}<sup>o</sup>C </p>  </div>
    <div class='icon'> <img src='${forecast[2].day.condition.icon}'  class='w-100'  /> </div>
  </div>
  <div>
    <p> ${forecast[2].day.mintemp_c}<sup>o</sup>C </p>
  </div>
  <div class="status text-center"> <p> ${forecast[2].day.condition.text}</p> </div>
  <div class="forecast-foot text-center">
    <span> <i class="fa-solid fa-umbrella"></i> ${forecast[2].day.daily_chance_of_rain} % </span>
    <span> <i class="fa-solid fa-wind"></i> ${forecast[2].day.maxwind_kph} km/h </span>
  </div>
  
  `;
}
