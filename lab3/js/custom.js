var coordinates = [];
var distances = [];
var startPos;
var myWorker = new Worker("worker.js");
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
        myWorker.postMessage([coordinates,startPos]);
    }
    else{
        alert("Your current location is unkown, allow geolocation to proceed");
    }
}

myWorker.onmessage = function(e){
    distances = e.data;
    alert(distances);
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

  // Setup the dnd listeners.
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
