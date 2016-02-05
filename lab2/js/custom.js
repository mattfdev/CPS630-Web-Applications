
document.getElementById("geolocate").onclick = function(){
  var startPos;
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
