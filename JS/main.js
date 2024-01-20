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
async function getWeatherApi(city) {
  try {
    let http = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=79bfff5c2aea4f6295f142203240901&q=${city}&days=7`
    );

    if (http.ok && http.status !== 400) {
      let response = await http.json();
      console.log(response);
      displayCity(response.location, response.current);
      displayNext(response.forecast.forecastday);
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
  </div> <div class="forecast-status text-center"> <p> ${temp.condition.text} </p></div>
  <div class="forecast-foot">
  <div class="row text-center">
  <div class="col-sm-4 col-md-4"><i class="fa-solid fa-umbrella"></i> ${temp.cloud} % </div>
  <div class="col-sm-4 col-md-4"> <i class="fa-solid fa-wind"></i> ${temp.wind_kph} km/h</div>
  <div class="col-sm-4 col-md-4"><i class="fa-regular fa-compass"></i>${temp.wind_dir}</div>
  </div></div>`;
}

function displayNext(forecast) {
  let x = ``;
  for (let i = 1; i < forecast.length; i++) {
    x += `
    <tr>
      <td> ${days[new Date(forecast[i].date.replace(" ", "T")).getDay()]}</td>
      <td >  ${forecast[i].day.condition.text}  <img src='${
      forecast[i].day.condition.icon
    }'/></td>
      <td> ${forecast[i].day.mintemp_c} <sup>o</sup> C</td> 
      <td>  ${forecast[i].day.maxtemp_c} <sup>o</sup> C</td>
    </tr>
    `;
  }

  document.getElementById("tableData").innerHTML = x;
}
