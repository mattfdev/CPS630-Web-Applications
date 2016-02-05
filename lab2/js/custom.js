//geolocation on button press
var startPos;
var city;
var country;
var forcast;
document.getElementById("geolocate").onclick = function(){
  var geoSuccess = function(position) {
    startPos = position;
    console.log("Test");
    console.log(startPos.coords.longitude);
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
    
};

