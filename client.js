console.log('client.js sourced');

var map;

//initMap function is called on startup to create map and center it on St. Paul
function initMap(){
  console.log("in initMap");
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 44.9396470, lng: -93.1384840},
    zoom: 13
  });
  //add a marker via lat/lng
  var grandAve = {lat: 44.9396470, lng: -93.1384840};
  //create object for marker and use a new marker constructor to display marker on map
  var marker = new google.maps.Marker({
    position: grandAve,
    map: map,
    title: 'First Marker!'
  });
}
