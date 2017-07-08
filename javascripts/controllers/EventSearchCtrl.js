app.controller("EventSearchCtrl", function($location, $routeParams, $scope, ngToast, BaseFactory, EventFactory, TripFactory) {

  $scope.alerts = [];

  $scope.mytime = new Date();
  $scope.hstep = 1;
  $scope.mstep = 1;
  $scope.ismeridian = true;
  
  $scope.toggleMode = () => {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = () => {
    let d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.newEventToSave = {
    end: "",
    start: "",
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

  let getMapBaseToSearchFrom = () => {
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

  let getBaseIdForSelectedBase = () => {
    $scope.baseSelected = BaseFactory.getBaseIdForSelectedBaseFromFB();
    if ($scope.baseSelected !== "") {
      getMapBaseToSearchFrom($scope.baseSelected);
    }
    else {
      $scope.baseSelected = "undefined";
      ngToast.create('Select a base to center your search.');
    }
  };

  getBaseIdForSelectedBase();

  $scope.changeBaseToSearchFrom = () => {
    getMapBaseToSearchFrom();
    $scope.searchEvents = "";
  };

  $scope.addToTripEvents = (searchEvent) => {
    let eventToBeSavedToFB = {
      address: searchEvent.vicinity,
      base: $scope.baseSelected,
      end: $scope.newEventToSave.end,
      latitude: searchEvent.geometry.location.lat(),
      longitude: searchEvent.geometry.location.lng(),
      name: searchEvent.name,
      ref: $scope.newEventToSave.ref,
      review: searchEvent.rating,
      start: $scope.newEventToSave.start,
      trip: $routeParams.tripId,
      type: $scope.newEventToSave.type
    };
    EventFactory.addToTripEventsInFB(eventToBeSavedToFB)
    .then((results) => {
      ngToast.create('Event added to trip.');
      $scope.newEventToSave = { };
    })
    .catch((error) => {
      console.log("error in addToTripEvents", error);
    });
  };

  let centerMapToBase = (latToSearch, longToSearch) => {
    let baseToSearchFrom = {lat: latToSearch, lng: longToSearch};
    map = new google.maps.Map(document.getElementById('map'), {
      center: baseToSearchFrom,
      zoom: 15
    });
  };

  let map = {};
  let infowindow;
  let placesArray = [];

  $scope.initMap = (userSearchTerms) => {
    placesArray = [];
    let basetoSearchFrom = {lat: latToSearch, lng: longToSearch};
    map = new google.maps.Map(document.getElementById('map'), {
      center: basetoSearchFrom,
      zoom: 15
    });
    infowindow = new google.maps.InfoWindow();
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: basetoSearchFrom,
      radius: 500,
      keyword: [userSearchTerms]
    }, getPlaces);
  };

  let getPlaces = (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      getPlaceDetails(results);
    }
  };

  let getPlaceDetails = (results) => {
    for (let i = 0; i < results.length; i++) {
      let request = {
        placeId: results[i].place_id
      };
      service = new google.maps.places.PlacesService(map);
      service.getDetails(request, detailsCallback);
    }
  };

  let detailsCallback = (place, status) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      placesArray.push(place);
    } else {
      console.log("error with getPlaceDetails callback", status);
    }
    applyToScope(placesArray);
  };

  let applyToScope = (placesArray) => {
    let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let labelIndex = 0;
    for (let i = 0; i < placesArray.length; i++) {
      placesArray[i].tag = labels[labelIndex++ % labels.length];
      createMarker(placesArray[i]);
    }
    $scope.$apply(() => {
      $scope.searchEvents = placesArray;
    });
  };

  let createMarker = (place) => {
    let placeLoc = place.geometry.location;
    let tag = {
      text: place.tag,
      color: 'white'
    };
    let icon = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'forestgreen',
      fillOpacity: 0.4,
      strokeColor: 'white',
      strokeWeight: 0.7,
      scale: 12
    };
    marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      icon: icon,
      label: tag,
      map: map,
      position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function(){
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  };
      
});