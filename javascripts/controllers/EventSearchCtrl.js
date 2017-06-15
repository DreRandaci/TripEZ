app.controller("EventSearchCtrl", function($location, $rootScope, $routeParams, $scope, BaseFactory, EventFactory, TripFactory) {

  $scope.alerts = [];

  let latToSearch;
  let longToSearch;

  $scope.baseCoords = {
    lat: "",
    long: ""
  };

  $scope.newEventToSave = {
    end: "",
    start: ""
  };

  let getSingleTripName = () => {
    TripFactory.getSingleTripNameFromFB($routeParams.tripId)
      .then((tripReturned) => {
      $scope.trip = tripReturned;
    }).catch((error) => {
      console.log("getSingleTripName error", error);
    });
  };

  getSingleTripName();

  let getBases = () => {
    BaseFactory.getBasesFromFB($routeParams.tripId)
      .then((bases) => {
      $scope.bases = bases;
    }).catch((error) => {
      console.log("getBases error", error);
    });
  };

  getBases();

  $scope.addToTripEvents = (searchEvent) => {
    console.log("event to be saved to list: ", searchEvent);
    let eventToBeSavedToFB = {};
    eventToBeSavedToFB.address = searchEvent.vicinity;
    eventToBeSavedToFB.end = $scope.newEventToSave.end;
    eventToBeSavedToFB.latitude = searchEvent.geometry.location.lat();
    eventToBeSavedToFB.longitude = searchEvent.geometry.location.lng();
    eventToBeSavedToFB.name = searchEvent.name;
    eventToBeSavedToFB.review = searchEvent.rating;
    eventToBeSavedToFB.start = $scope.newEventToSave.start;
    EventFactory.addToTripEventsInFB(eventToBeSavedToFB)
      .then((results) => {
        console.log("results returned from addToTripEventsInFB: ", results);
        $scope.alerts[0] = {msg: "Saved to trip!"};
      })
      .catch((error) => {
        console.log("error in addToTripEvents", error);
      });
  };

  $scope.setBaseSearchCoordinates = () => {
    let baseCoordsArray = $scope.baseCoords.split(',');
    latToSearch = Number(baseCoordsArray[0]);
    longToSearch = Number(baseCoordsArray[1]);
    centerMapToBase(latToSearch, longToSearch);
  };

  let centerMapToBase = (latToSearch, longToSearch) => {
    var baseToSearchFrom = {lat: latToSearch, lng: longToSearch};
    map = new google.maps.Map(document.getElementById('map'), {
      center: baseToSearchFrom,
      zoom: 15
    });
  };

  $scope.searchGooglePlaces = (userSearchTerms) => {
  	initMap(userSearchTerms);
  };

  var map;
  var infowindow;

  let initMap = (userSearchTerms) => {
    var basetoSearchFrom = {lat: latToSearch, lng: longToSearch};

    map = new google.maps.Map(document.getElementById('map'), {
      center: basetoSearchFrom,
      zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: basetoSearchFrom,
      radius: 500,
      keyword: [userSearchTerms]
    }, callback);
  };

  let callback = (results, status) => {
    let resultsArray = [];
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        console.log("resulting place: ", results[i]);
        createMarker(results[i]);
        resultsArray.push(results[i]);
      }
    }
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