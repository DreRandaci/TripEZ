app.controller("EventSearchCtrl", function($location, $rootScope, $routeParams, $scope, EventFactory) {

  $scope.searchEvents = {};

  $scope.searchGooglePlaces = (userSearchTerms) => {
  	initMap(userSearchTerms);
  };

  var map;
  var infowindow;

  let initMap = (userSearchTerms) => {
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
      keyword: [userSearchTerms]
    }, callback);
  };

  let callback = (results, status) => {
    let resultsArray = [];
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
        resultsArray.push(results[i]);
      }
    }
    // $scope.searchEvents = resultsArray;
    // console.log("$scope.searchEvents: ", $scope.searchEvents);
    $scope.$apply(function () {
            $scope.searchEvents = resultsArray;
        });
  };

  let createMarker = (place) => {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  };

});