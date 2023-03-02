var prevCity = document.createElement('button');
var searchBtn = document.querySelector('#search-button');
var cityInput = document.querySelector('#city');
var prevCityList = document.querySelector('#previous-cities');
var listElement = document.createElement('li');
var currentWeather = document.querySelector('#container');
var forecast = document.querySelector('#forecast');

var today = dayjs().format('MM/DD/YYYY');
console.log(today)
// var city = cityInput.value;

var citySelection = function (event) {
    event.preventDefault();
    
    var cityName = cityInput.value;
    console.log('this is my city', cityName)
    fetchCityData(cityName);

}

function fetchCityData(city) {
    var apiKey = '52d138b9667dda9350ee7e1e9b972bc7';
    var geoCodeUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&limit=1&appid=' + apiKey;
    fetch(geoCodeUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(weatherData) {
        console.log('this is my weather data', weatherData)
        var cityName = document.createElement('h2');
        var cityTemp = document.createElement('h2');
        var cityWind = document.createElement('h2');
        var cityHumidity = document.createElement('h2');
        var cityIcon = weatherData.weather[0].icon;
        var latitude = weatherData.coord.lat;
        var longitude = weatherData.coord.lon;

        cityName.textContent = weatherData.name + ' (' + today + ')';
        currentWeather.append(cityName);

        cityTemp.textContent = 'Temperature: ' + Math.round((weatherData.main.temp-273.15) *9 /5 + 32) + '\xB0' + 'F';
        currentWeather.append(cityTemp);

        cityWind.textContent = 'Wind: ' + weatherData.wind.speed + ' MPH';
        currentWeather.append(cityWind);

        cityHumidity.textContent = 'Humidity: ' + weatherData.main.humidity + '%';
        currentWeather.append(cityHumidity);

        // get UV data
        var getUV = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude={part}&appid=' + 'f30dc0b71f772a037a522282770190be'
        fetch(getUV)
        .then(function (response) {
            return response.json();
        })
        .then(function(uvReponse) {
            console.log('this is the uv', uvReponse);
            var weatherForecast = document.createElement('div');
            var forecastTemp = document.createElement('h3');
            var forecastWind = document.createElement('h3');
            var forecastHumidity = document.createElement('h3');

            for (var i = 0; i < 5; i++) {

            forecast.append(weatherForecast);

            forecastTemp.textContent = 'Temp: ' + Math.round((uvReponse.daily[i].temp.day-273.15) *9 /5 + 32) + '\xB0' + 'F';
            weatherForecast.append(forecastTemp);

            forecastWind.textContent = 'Wind: ' + uvReponse.daily[i].wind_speed + ' MPH';
            weatherForecast.append(forecastWind);

            forecastHumidity.textContent = 'Humidity: ' + uvReponse.daily[i].humidity + '%';
            weatherForecast.append(forecastHumidity);
            }




        })
        
    })
    
}

var geoCode = function (generateGeoCode) {
    var geoCodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=52d138b9667dda9350ee7e1e9b972bc7';


}

searchBtn.addEventListener('click', citySelection)