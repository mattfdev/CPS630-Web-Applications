//geolocation on button press
var startPos;
var city;
var country;
var forcast;
var type;
document.getElementById("geolocate").onclick = function(){
  var geoSuccess = function(position) {
    startPos = position;
    console.log("Test");
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
    var queryDict = {};
    location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]});
    city = queryDict["city"];
    country = queryDict["country"];
    forcast = queryDict["forcast"];
    type = queryDict["type"];
};
function lookupCoord(lon,lat){
    var xmlhttp = new XMLHttpRequest();
    var url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID=59bfbf0f1e84f7ac7b16b0828e47578c";

    xmlhttp.onload = function(){
        console.log("this");
        var results = JSON.parse(this.responseText);
        alert(results.name);
        
    }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}
