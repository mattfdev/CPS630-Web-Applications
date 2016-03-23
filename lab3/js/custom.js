var coordinates = [];
var addresses = [];
var distances;
var startPos;
var workerJson;
var myWorker = new Worker("js/worker.js");
var geocoder = new google.maps.Geocoder;
function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var file = evt.dataTransfer.files[0]; // FileList object.
    var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = function(e) {
        var text = reader.result;
        var lines = text.split('\n');
        for(var line = 0; line < lines.length; line++){
            coordinates.push(lines[line]);
        }
    }
    reader.readAsText(file);
    if(startPos !== undefined){
        reverseGeo();
        buildJson();
        
        myWorker.postMessage(workerJson);
    }
    else{
        alert("Your current location is unkown, allow geolocation to proceed");
    }
}

function buildJson(){
    workerJson = JSON.stringify({currentLocationLat:startPos.coords.latitude,
                  currentLocationLon:startPos.coords.longitude,
                  listLocations:coordinates});
}

myWorker.onmessage = function(e){
    distances = e.data.calulatedDist;
    setTimeout(displayInformation,5000) ;
}

function reverseGeo(){
    for(var i =0; i < coordinates.length;i++){
        var latlngStr = coordinates[i].split(',', 2);
        var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
        lookUp(latlng,i);
    }
}

function lookUp(latlng,i){
    setTimeout(function(){
        geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var addrString = results[0].formatted_address;
            addresses.push(addrString);
        } else {
        //window.alert('No results found '+ status);
         }
  });
    }, 500*i);
}

function mapCoordinates(postition) {
    function initialize() {
    var myCenter= new google.maps.LatLng(postition.coords.latitude,postition.coords.longitude);
    var mapProp = {
        center:myCenter,
        zoom:12,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
  
    var marker=new google.maps.Marker({
        position:myCenter,
     });

    marker.setMap(map);
  }
    initialize();
}

var geoSuccess = function(position) {
    startPos = position;
    mapCoordinates(startPos);
  };
var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
  };
navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

    
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }
  
  function displayInformation(){
      var printString = '';
      for(var i=0;i<distances.length;i++){
          printString += '<p>Location of first Lat,Lon pair is '+ addresses[i]+' and the distance from the user is '+ distances[i] + 'km.</p><br>';
      }
      document.getElementById('infoPlug').innerHTML= printString;
  }
  
  

  // Setup the dnd listeners.
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);

