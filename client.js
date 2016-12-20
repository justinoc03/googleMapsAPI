console.log('client.js sourced');

var map;
var markers = [];

//initMap function is called on startup to create map and center it on St. Paul
var initMap = function(){
  console.log("in initMap");

  // Constructor object creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 44.9396470, lng: -93.1384840},
    zoom: 13
  });

  // These are the real estate listings that will be shown to the user.
  // Normally we'd have these in a database instead.
   var locations = [
     {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
     {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
     {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
     {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
     {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
     {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
   ];

   // Style the markers a bit. This will be our listing marker icon.
   var defaultIcon = makeMarkerIcon('0091ff');
   // Create a "highlighted location" marker color for when the user
   // mouses over the marker.
   var highlightedIcon = makeMarkerIcon('31CF3E');

   //constructor object
   var largeInfowindow = new google.maps.InfoWindow();

   for (var i = 0; i < locations.length; i++) {
    //  console.log('locations[i]', locations[i]);
     // get the position(lat,lng) & title from the location array for each location
     var position = locations[i].location;
     var title = locations[i].title;
     // create a marker for each location. and push them into the markers array created above
     var marker = new google.maps.Marker({
       map: map,
       position: position,
       title: title,
       icon: defaultIcon,
       animation: google.maps.Animation.DROP,
       id: i
     });
     markers.push(marker);

     //create an onclick event to open an infowindow at each marker
     marker.addListener('click', function(){
       populateInfoWindow(this, largeInfowindow);
     });

     marker.addListener('click', function(){
       bounceAnimation(this);
     });

     marker.addListener('mouseover', function(){
       this.setIcon(highlightedIcon);
     });

     marker.addListener('mouseout', function(){
       this.setIcon(defaultIcon);
     });

   }
      console.log(markers);

  document.getElementById('show-listings').addEventListener('click', showListings);
  document.getElementById('hide-listings').addEventListener('click', hideListings);
}; //end initMap function

/////////bounceAnimation function/////////////
function bounceAnimation(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            marker.setAnimation(null);
        }, 1400);
    }
}

/////////populateInfoWindow function/////////////
//populateInfoWindow populates the infowindow with info when the marker is clicked
function populateInfoWindow(marker, infowindow) {
  //check to make sure hte infowindow is not already opened on this marker
  if(infowindow.marker != marker){
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>' + '<div>' + marker.position + '</div>');
    infowindow.open(map, marker);
    //make sure the marker property is cleared if the infowindow is closed
    infowindow.addListener('closeclick', function(){
      infowindow.marker(null);
    });
  }
}

/////////showListings function/////////////
// This function will loop through the markers array and display them
function showListings() {
  //create new bounds within map
  var bounds = new google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker on our current map
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  //fit the new bounds for our new positions
  map.fitBounds(bounds);
}

/////////hideListings function/////////////
// This function will loop through the listings and hide them all.
function hideListings() {
 for (var i = 0; i < markers.length; i++) {
   //null hides the markers, not deleting them
   markers[i].setMap(null);
 }
}

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21, 34));
  return markerImage;
}
