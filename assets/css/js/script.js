var icons = {
    "01d":"☀️" ,
    "02d":"⛅️" ,
    "03d":"☁️" ,
    "04d":"☁️" ,
    "09d":"\uD83C\uDF27" ,
    "10d":"\uD83C\uDF26" ,
    "11d":"⛈" ,
    "13d":"❄️" ,
    "50d":"\uD83C\uDF2B" ,
    "01n":"\uD83C\uDF11" ,
    "02n":"\uD83C\uDF11 ☁" ,
    "03n":"☁️" ,
    "04n":"️️☁☁" ,
    "09n":"\uD83C\uDF27" ,
    "10n":"☔️" ,
    "11n":"⛈" ,
    "13n":"❄️" ,
    "50n":"\uD83C\uDF2B"
  };

var apiKey = "aacdfb2450cba7482203e8b3fcc7ea78";
var city;
var number = 0;
var searchBar = document.getElementById('search-bar');
var searchButton = document.getElementById("search-btn");
var buttonList = document.querySelectorAll('city-buttons');
searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    var inputCity = document.getElementById("user-input").value;
    console.log("City: " + inputCity);
    localStorage.setItem("City", inputCity);

    getCity(inputCity);
});
if (localStorage.getItem("City")){
    getCity();
};

searchBar.addEventListener('click', function(e) {
    if(e.target.classList.contains('city-buttons')) {
    var cityBtn = e.target.innerHTML;
    console.log("City button: " + cityBtn);
    localStorage.setItem('City', cityBtn);
    getCity(cityBtn);
}

});

function getCity() {
    var cityName = localStorage.getItem("City");
    var citySearch = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + '&appid=' + apiKey;
    fetch(citySearch)
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            console.log(data);
            city = data.name;
            temp = data.main.temp;
            wind = data.wind.speed
            humid = data.main.humidity
            lat = data.coord.lat;
            lon = data.coord.lon;
            icon = data.weather[0].icon
            console.log('lat: ' + lat + ' lon: ' + lon)
            localStorage.setItem('lat', JSON.stringify(lat));
            localStorage.setItem('lon', JSON.stringify(lon));
            localStorage.setItem('temp', JSON.stringify(temp));
            localStorage.setItem('wind', JSON.stringify(wind));
            localStorage.setItem('humid', JSON.stringify(humid));
            localStorage.setItem('city', JSON.stringify(city));
            localStorage.setItem('icon', JSON.stringify(icon));
            
            cityButton();
        })

        function cityButton() {
            var buttonText = JSON.parse(localStorage.getItem('city'));
            var existingButtons = document.querySelectorAll('#button');
            
          
            var isExistingButton = Array.from(existingButtons).some(function(button) {
              return button.textContent === buttonText;
            });
          
            if (isExistingButton) {
           
              todayWeather();
            } else {
      
              var newButton = document.createElement('button');
              newButton.setAttribute('class', 'button city-buttons has-text-centered is-outlined');
              newButton.setAttribute('id', 'button');
              newButton.setAttribute('font-family', 'Roboto Slab', 'serif');
              newButton.textContent = buttonText;
              localStorage.setItem('button', JSON.stringify(buttonText));
              searchBar.appendChild(newButton);
          
              todayWeather();
            }
          }
   
    function todayWeather() {
        var weatherIcon = JSON.parse(localStorage.getItem('icon'));
        
        var todaysCity = document.getElementById('city-name-date');
        date = dayjs().format('MMMM DD, YYYY');
        todaysCity.innerHTML = city + ' (' + date + ')' + icons[weatherIcon];
        console.log(weatherIcon);


        var todayTemp = document.getElementById("today-temp");
        var tempConvert = (1.8 * (temp - 273) + 32)
        var tempDecimal = Math.trunc(tempConvert);
        todayTemp.innerHTML = "Temperature: " + tempDecimal + "°F";

        var todayWind = document.getElementById('today-wind');
        var windConvert = wind * 0.6214;
        var windDecimal = Math.trunc(windConvert);
        todayWind.innerHTML = "Wind: " + windDecimal + " mph";

        var todayHumid = document.getElementById('today-humid');
        todayHumid.innerHTML = "Humidity: " + humid + " %";

        localStorage.setItem('city', JSON.stringify(city));
    };

    getLatLon();
}

function getLatLon() {
    var weatherKey = 'a32fce2f7fccf17ab5e66b150ba29270'
    var lat = JSON.parse(localStorage.getItem('lat'));
    var lon = JSON.parse(localStorage.getItem('lon'));

    console.log('lat ' + lat + ' lon ' + lon)
    var fiveDayApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + '&lon=' + lon + '&appid=' + weatherKey;
    fetch(fiveDayApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            localStorage.setItem('list', JSON.stringify(data.list));
        });
    makeCards();
}
var dayBox = document.getElementsByClassName('day-box');
function makeCards() {
    var dayList = JSON.parse(localStorage.getItem('list'));
    console.log(dayList);
    var dayTemp = dayList[number].main.temp_max;
    var dayWind = dayList[number].wind.speed;
    var dayHumid = dayList[number].main.humidity;
    console.log(dayTemp)
    console.log(dayWind)
    console.log(dayHumid)

    for (var i = 0; i < 5; i++) {
        console.log(dayList[i]);
        var tempOne = document.getElementById('temp1');
        var tempTwo = document.getElementById('temp2');
        var tempThree = document.getElementById('temp3');
        var tempFour = document.getElementById('temp4');
        var tempFive = document.getElementById('temp5');

        tempOne.textContent = 'Temp: ' + Math.trunc(1.8 * (dayList[0].main.temp_max - 273) + 32) + "°F";
        tempTwo.textContent = 'Temp: ' + Math.trunc(1.8 * (dayList[1].main.temp_max - 273) + 32) + "°F";
        tempThree.textContent = 'Temp: ' + Math.trunc(1.8 * (dayList[2].main.temp_max - 273) + 32) + "°F";
        tempFour.textContent = 'Temp: ' + Math.trunc(1.8 * (dayList[3].main.temp_max - 273) + 32) + "°F";
        tempFive.textContent = 'Temp: ' + Math.trunc(1.8 * (dayList[4].main.temp_max - 273) + 32) + "°F";

        var windOne = document.getElementById('wind1');
        var windTwo = document.getElementById('wind2');
        var windThree = document.getElementById('wind3');
        var windFour = document.getElementById('wind4');
        var windFive = document.getElementById('wind5');

        windOne.textContent = 'Wind: ' + Math.trunc(dayList[0].wind.speed * 0.6214);
        windTwo.textContent = 'Wind: ' + Math.trunc(dayList[1].wind.speed * 0.6214);
        windThree.textContent = 'Wind: ' + Math.trunc(dayList[2].wind.speed * 0.6214);
        windFour.textContent = 'Wind: ' + Math.trunc(dayList[3].wind.speed * 0.6214);
        windFive.textContent = 'Wind: ' + Math.trunc(dayList[4].wind.speed * 0.6214);


        var humidOne = document.getElementById('humid1');
        var humidTwo = document.getElementById('humid2');
        var humidThree = document.getElementById('humid3');
        var humidFour = document.getElementById('humid4');
        var humidFive = document.getElementById('humid5');

        humidOne.textContent = 'Humidity: ' + dayList[0].main.humidity + " %";
        humidTwo.textContent = 'Humidity: ' + dayList[1].main.humidity + " %";
        humidThree.textContent = 'Humidity: ' + dayList[2].main.humidity + " %";
        humidFour.textContent = 'Humidity: ' + dayList[3].main.humidity + " %";
        humidFive.textContent = 'Humidity: ' + dayList[4].main.humidity + " %";
    }
    setDate();
}

function setDate() {
    var weatherIcon = JSON.parse(localStorage.getItem('icon'));
    

    var dayOne = document.getElementById('day-box1');
    var dayTwo = document.getElementById('day-box2');
    var dayThree = document.getElementById('day-box3');
    var dayFour = document.getElementById('day-box4');
    var dayFive = document.getElementById('day-box5');

    const a = dayjs();
    const b = a.add(1, 'd').format('MM/DD/YYYY');
    const c = a.add(2, 'd').format('MM/DD/YYYY');
    const d = a.add(3, 'd').format('MM/DD/YYYY');
    const e = a.add(4, 'd').format('MM/DD/YYYY');
    const f = a.add(5, 'd').format('MM/DD/YYYY');

    dayOne.textContent = (b + icons[weatherIcon]);
    dayTwo.textContent = (c + icons[weatherIcon]);
    dayThree.textContent = (d + icons[weatherIcon]);
    dayFour.textContent = (e + icons[weatherIcon]);
    dayFive.textContent = (f + icons[weatherIcon]);
}
