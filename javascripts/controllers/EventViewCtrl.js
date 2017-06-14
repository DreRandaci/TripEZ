app.controller("EventViewCtrl", function($location, $rootScope, $routeParams, $scope, EventFactory) {

	// let key = GOOGLE_CONFIG.apiKey;

	let getSingleEvent = () => {
    EventFactory.getSingleEventFromFB($routeParams.eventId)
  	.then((event) => {
      $scope.event = event;
  	})
  	.catch((error) => {
      console.log("getSingleEvent error", error);
 	 	});
  };

  getSingleEvent();

  $scope.loadPlaceSearch = (userInput) => {
  	$scope.event = "";
  	EventFactory.searchGooglePlaces(userInput, key)
		.then((places) => {
			console.log(places);
		})
		.catch((error) => {
			console.log("loadPlaceSearch error: ", error);
		});
  };

// google places functions

  var map;
  var infowindow;

  $scope.initMap = () => {
    var pyrmont = {lat: -33.867, lng: 151.195};

    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: pyrmont,
      radius: 500,
      type: ['store']
    }, callback);
  };

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

});