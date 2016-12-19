console.log('client.js sourced');

var map;

function initMap(){
  console.log("in initMap");
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 44.9396470, lng: -93.1384840},
    zoom: 13
  });
}
