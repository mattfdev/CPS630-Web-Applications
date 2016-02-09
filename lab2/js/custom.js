//geolocation on button press
var startPos;
var city;
var country;
var forcast;
var unit;
document.getElementById("geolocate").onclick = function(){
  var geoSuccess = function(position) {
    startPos = position;
    //console.log(startPos.coords.longitude);
    lookupCoord(startPos.coords.longitude,startPos.coords.latitude);
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
  };
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};

//get location from form and submit to OpenWeather via API
function getLocation(){
    city = document.getElementById("city").value;
    country = document.getElementById("country").value;
    unit = document.querySelector('input[name="unit"]:checked').value;
    getWeatherData(city,country,unit);
};

function lookupCoord(lon,lat){
    var xmlhttp = new XMLHttpRequest();
    var url = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=metric&APPID=59bfbf0f1e84f7ac7b16b0828e47578c";

    xmlhttp.onload = function(){
        console.log("geobutton");
        var results = JSON.parse(this.responseText);
        utilizeData(results);
        
    }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

function getWeatherData(city,country,unit){
    var xmlhttp2 = new XMLHttpRequest();
    var url = "http://api.openweathermap.org/data/2.5/forecast?q="+city+","+country+"&units="+unit+"&APPID=59bfbf0f1e84f7ac7b16b0828e47578c";
    //alert(url);
	xmlhttp2.onload = function(){
        console.log("form");
        var results = JSON.parse(this.responseText);
        utilizeData(results);
        
    }
    xmlhttp2.open("GET",url,true);
    xmlhttp2.send(null);
   // alert("test");
}

function utilizeData(results){
    var location = results.city.name;
    var minTemp = results.list[0].main.temp_min;
    var maxTemp = results.list[0].main.temp_max;
    var temp = results.list[0].main.temp;
    var time = results.list[0].dt;
    var weather = results.list[0].weather.main;
    var description = results.list[0].weather.description;
    var weatherHTML =document.getElementById("city"); 
    weatherHTML.innerHTML = "<h2> Weather for the City of " +location +"</h2>";
   // weatherHTML.innerHTML = "<h3> Current Temperature " + temp + "</h3>"; 
    document.getElementById("current").innerHTML = "<h3> It is " + temp + " C right now</h3>";
}