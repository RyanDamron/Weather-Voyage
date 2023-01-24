var apiKey = "aacdfb2450cba7482203e8b3fcc7ea78";
var city;

var searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    var inputCity = document.getElementById("user-input").value;
    console.log("City: " + inputCity);
    localStorage.setItem("City", inputCity);
    getCity();
});

function getCity() {
    var cityName = localStorage.getItem("City");
    var citySearch = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + '&appid=' + apiKey;
        fetch(citySearch)
            .then(function (response) {
                return response.json();
                
            })
            .then (function(data) {
                console.log(data);
                city = data.name;
                temp = data.main.temp;
                wind = data.wind.speed
                humid = data.main.humidity
    
                
                todayWeather(); 
            })
       
       function todayWeather() {

        var todaysCity = document.getElementById('city-name-date');
        date = dayjs().format('MMMM DD, YYYY');
        todaysCity.innerHTML = city + ' (' + date + ')';
        
        var todayTemp = document.getElementById("today-temp");
        var tempConvert = (1.8*(temp-273)+32)
        var tempDecimal = Math.trunc(tempConvert);
        todayTemp.innerHTML = "Temperature: " + tempDecimal +  "° F";
        
        var todayWind = document.getElementById('today-wind');
        var windConvert = wind * 0.6214;
        var windDecimal = Math.trunc(windConvert);
        todayWind.innerHTML = "Wind: " + windDecimal + " mph";

        var todayHumid = document.getElementById('today-humid');
        todayHumid.innerHTML = "Humidity: " + humid + " %";
    }; 
    }

    
// function getLatLon() {
//     var latLon = localStorage.getItem('')
// }
    // getCity();
    // function getCity() {
    // 	fetch("https://api.openweathermap.org/geo/1.0/direct?q=austin&appid=a32fce2f7fccf17ab5e66b150ba29270")

    // .then(function(response){
    //     return response.json("http://api.openweathermap.org/geo/1.0/reverse?lat&lon&appid=a32fce2f7fccf17ab5e66b150ba29270");
    // })
    //     .then (function(data) {
    //         console.log(data);
    //     });
    // }
    // getCity();


// }
// var inputCity = 


// fetch("https://api.openweathermap.org/data/2.5/forecast?q=city=Moscow&&appid=aacdfb2450cba7482203e8b3fcc7ea78")

// function cityName() {
//     fetch(citySearch)
//         .then(function (response) {
//             return response.json
//         });
// }