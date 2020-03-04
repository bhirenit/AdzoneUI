//Set up some of our variables.
var map; //Will contain map object.
var marker = false; ////Has the user plotted their location marker? 
        
//Function called to initialize / create the map.
//This is called when the page has loaded.
var placeSearch, autocomplete, geocoder;

var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'), {types: ['geocode']});

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(['address_component']);

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle(
          {center: geolocation, radius: position.coords.accuracy});
      autocomplete.setBounds(circle.getBounds());
    });
  }
}





function initMap() {

    //The center location of our map.
    var centerOfMap = new google.maps.LatLng(23.039187483345813, 72.56027210192747);
    geocoder= new google.maps.Geocoder();
    //Map options.
    var options = {
      center: centerOfMap, //Set center.
      zoom: 14 //The zoom value.
    };

    //Create the map object.
    map = new google.maps.Map(document.getElementById('map'), options);

    //Listen for any clicks on the map.
    google.maps.event.addListener(map, 'click', function(event) {                
        //Get the location that the user clicked.
        var clickedLocation = event.latLng;
        //If the marker hasn't been added.
        if(marker === false){
            //Create the marker.
            marker = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true //make it draggable
            });
            //Listen for drag events!
            google.maps.event.addListener(marker, 'dragend', function(event){
                markerLocation();
            });
        } else{
            //Marker has already been added, so just change its location.
            marker.setPosition(clickedLocation); 
        }
        //Get the marker's location.
        markerLocation();
    });
}
        
//This function will get the marker's current location and then add the lat/long
//values to our textfields so that we can save the location.
function markerLocation(){
    //Get location.
    var currentLocation = marker.getPosition();
    var lat = currentLocation.lat(); 
    var lng = currentLocation.lng();
    var address ;
    var city ;
    var state ;
    //Add lat and lng values to a field that we can save.
    fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyAeWwZ3gDRU13z6jiQRTuhFkA3ugQG_Q7Q")
    .then(res=>res.json())
    .then((out)=>{
    	document.getElementById('product_location').value = out.results[0].formatted_address;
    	for(var i = 0 ; i< out.results[1].address_components.length; i++){
    		var type = out.results[1].address_components[i].types[0] ;
    		if(type== "administrative_area_level_2")
    		{
    			 document.getElementById('city').value = out.results[1].address_components[i].long_name;
    		}
    		else if(type ==  "administrative_area_level_1")
    		{
    			document.getElementById('state').value = out.results[1].address_components[i].long_name;
    		}
    		else
    		{
    			
    		}
    	}
   
    
    });
    /*var address = geocoder.reverseGeocode(new google.maps.LatLng(lat,lng));
    console.log(address);*/
    document.getElementById('lat').value = lat;//latitude
    document.getElementById('lng').value = lng;
     //longitude
}
        
        
//Load the map when the page has finished loading.
google.maps.event.addDomListener(window, 'load', initMap);