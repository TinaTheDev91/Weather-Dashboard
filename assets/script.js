var searchBtn = document.querySelector('#search-button');
var cityInput = document.querySelector('#city');
var searchArea = document.querySelector('.search-area');
var currentWeather = document.querySelector('.current-weather');
var forecast = document.querySelector('#forecast');

var prevCityBtn = document.querySelector('.prevCityBtn');

var today = dayjs().format('M/D/YYYY');
console.log(today)


var citySelection = function (event) {
    event.preventDefault();
    
    var cityName = cityInput.value;
    
    console.log('this is my city', cityName)
    
    if (cityInput.clicked === true) {
            cityName;
        } 

        fetchCityData(cityName);
            
            
    var cityArray = JSON.parse(localStorage.getItem('cityArray')) || [];
    if (cityArray.includes(cityName)) {
        return;
    } else {
        cityArray.push(cityName);
    }
    localStorage.setItem('cityArray', JSON.stringify(cityArray));
    
    function generatePreviousCities() {
        var prevCity = document.createElement('button');
        var prevCityList = document.createElement('ul');
        var listElement = document.createElement('li');
        searchArea.appendChild(prevCityList); //append ul element
        for (var i = 0; i < cityArray.length; i++) {
            prevCity.textContent = cityArray[i]; //button text
            listElement.appendChild(prevCity); //add button as an li
            prevCity.classList.add('prevCityBtn');
            prevCityList.appendChild(listElement); 
            
            var prevCityBtn = document.querySelector('.prevCityBtn');

            prevCityBtn.addEventListener('click', citySelection);
            
    }}
    generatePreviousCities();
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
        var cityIconCode = weatherData.weather[0].icon;
        var latitude = weatherData.coord.lat;
        var longitude = weatherData.coord.lon;
        var weatherIcon = 'http://openweathermap.org/img/wn/' + cityIconCode + '@2x.png';

        var iconHouse = document.createElement('h2');
        iconHouse.innerHTML = '<img src="' + weatherIcon + '"' + '</img>';

        console.log(iconHouse)

        cityName.textContent = weatherData.name + ' (' + today + ')';
        currentWeather.append(cityName);
        currentWeather.append(iconHouse);

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
                var forecastIcon = uvResponse.daily[0].weather[0].icon;
                var iconURL = 'http://openweathermap.org/img/wn/' + forecastIcon + '@2x.png';
                console.log(forecastIcon);

                var iconHouse = document.createElement('h2');
                iconHouse.innerHTML = '<img src="' + iconURL + '"' + '</img>';
                console.log(iconHouse)

            forecast.append(weatherForecast);

            forecastDate.textContent = dayjs().add(i, 'day').format('M/D/YYYY');
            weatherForecast.append(forecastDate);
            weatherForecast.append(iconHouse);
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

function clearPrevResults () {
    var forecastDiv = document.getElementsByClassName('forecast-div');
    var h2Tags = document.getElementsByTagName('h2');

    forecastDiv.remove();
    h2Tags.remove();

}

searchBtn.addEventListener('click', clearPrevResults);
searchBtn.addEventListener('click', citySelection);