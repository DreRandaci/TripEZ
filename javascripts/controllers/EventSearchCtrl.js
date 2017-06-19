app.controller("EventSearchCtrl", function($location, $routeParams, $scope, BaseFactory, EventFactory, TripFactory) {

  $scope.alerts = [];

  $scope.mytime = new Date();
  $scope.hstep = 1;
  $scope.mstep = 1;
  $scope.ismeridian = true;
  
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.newEventToSave = {
    end: "",
    start: ""
  };

  let latToSearch;
  let longToSearch;

  let getSingleTripName = () => {
    TripFactory.getSingleTripNameFromFB($routeParams.tripId)
    .then((tripReturned) => {
      $scope.trip = tripReturned;
    })
    .catch((error) => {
      console.log("getSingleTripName error", error);
    });
  };

  getSingleTripName();

  let getBases = () => {
    BaseFactory.getBasesFromFB($routeParams.tripId)
    .then((bases) => {
      $scope.bases = bases;
    })
    .catch((error) => {
      console.log("getBases error", error);
    });
  };

  getBases();

  $scope.addToTripEvents = (searchEvent) => {
    let eventToBeSavedToFB = {
      address: searchEvent.vicinity,
      base: $scope.baseSelected,
      end: $scope.newEventToSave.end,
      endTime: $scope.newEventToSave.endTime,
      latitude: searchEvent.geometry.location.lat(),
      longitude: searchEvent.geometry.location.lng(),
      name: searchEvent.name,
      ref: $scope.newEventToSave.ref,
      review: searchEvent.rating,
      start: $scope.newEventToSave.start,
      startTime: $scope.newEventToSave.startTime,
      trip: $routeParams.tripId,
      type: $scope.newEventToSave.type
    };
    EventFactory.addToTripEventsInFB(eventToBeSavedToFB)
    .then((results) => {
      $scope.alerts[0] = {msg: "Saved to trip!"};
    })
    .catch((error) => {
      console.log("error in addToTripEvents", error);
    });
  };

  $scope.setBaseToSearchFrom = () => {
    BaseFactory.getBaseWithBaseIdFromFB($scope.baseSelected)
    .then((baseReturned) => {
      latToSearch = baseReturned.latitude;
      longToSearch = baseReturned.longitude;
      centerMapToBase(latToSearch, longToSearch);
    })
    .catch ((error) => {
      console.log("error in setBaseToSearchFrom", error);
    });
  };

  let centerMapToBase = (latToSearch, longToSearch) => {
    var baseToSearchFrom = {lat: latToSearch, lng: longToSearch};
    map = new google.maps.Map(document.getElementById('map'), {
      center: baseToSearchFrom,
      zoom: 15
    });
  };

  var map = {};
  var infowindow;

  $scope.initMap = (userSearchTerms) => {
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