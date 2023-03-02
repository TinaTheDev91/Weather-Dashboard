var prevCity = document.createElement('button');
var searchBtn = document.querySelector('#search-button');
var cityInput = document.querySelector('#city');
var prevCityList = document.querySelector('#previous-cities');
var listElement = document.createElement('li');
var currentWeather = document.querySelector('.current-weather');
var forecast = document.querySelector('#forecast');

var today = dayjs().format('MM/DD/YYYY');
console.log(today)

var citySelection = function (event) {
    event.preventDefault();

    var cityName = cityInput.value;
    console.log('this is my city', cityName)
    fetchCityData(cityName);

    for (var i = 1; i <= 1000; i++) {
        localStorage.setItem("prevCity" + [i], cityName);
    }

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
        .then(function(uvResponse) {
            console.log('this is the uv', uvResponse);
            
            for (var i = 0; i < 5; i++) {
                var weatherForecast = document.createElement('div');
                var forecastDate = document.createElement('h4');
                var forecastTemp = document.createElement('h4');
                var forecastWind = document.createElement('h4');
                var forecastHumidity = document.createElement('h4');
                var forecastIcon = uvResponse.daily[0].icon;
                
            forecast.append(weatherForecast);

            forecastDate.textContent = dayjs().add(i, 'day').format('M/D/YYYY');
            weatherForecast.append(forecastDate);
            weatherForecast.classList.add('forecast-div');
            weatherForecast.classList.add('col');

            forecastTemp.textContent = 'Temp: ' + Math.round((uvResponse.daily[i].temp.day-273.15) *9 /5 + 32) + '\xB0' + 'F';
            weatherForecast.append(forecastTemp);

            forecastWind.textContent = 'Wind: ' + uvResponse.daily[i].wind_speed + ' MPH';
            weatherForecast.append(forecastWind);

            forecastHumidity.textContent = 'Humidity: ' + uvResponse.daily[i].humidity + '%';
            weatherForecast.append(forecastHumidity);
            }
        })
        
    })
    
}

// var geoCode = function (generateGeoCode) {
//     var geoCodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=52d138b9667dda9350ee7e1e9b972bc7';


// }

searchBtn.addEventListener('click', citySelection)