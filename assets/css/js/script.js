function getCity() {
	fetch("https://api.openweathermap.org/geo/1.0/direct?q=austin&appid=a32fce2f7fccf17ab5e66b150ba29270")
    
.then(function(response){
    return response.json("http://api.openweathermap.org/geo/1.0/reverse?lat&lon&appid=a32fce2f7fccf17ab5e66b150ba29270");
})
    .then (function(data) {
        console.log(data);
    });
}
getCity();
var searchButton = document.getElementById("search-button");
searchButton.addEventListener


var citySearch = "https://api.openweathermap.org/data/2.5/forecast?q=" + city;
console.log(citySearch);

// fetch("https://api.openweathermap.org/data/2.5/forecast?q=city=Moscow&&appid=aacdfb2450cba7482203e8b3fcc7ea78")

function cityName() {
    fetch(citySearch)
    .then(function(response) {
        return response.json
    });
}