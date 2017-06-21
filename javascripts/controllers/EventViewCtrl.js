app.controller("EventViewCtrl", function($location, $routeParams, $scope, ngToast, BaseFactory, EventFactory, TripFactory) {

  let getSingleEvent = () => {
    EventFactory.getSingleEventFromFB($routeParams.eventId)
    .then((event) => {
      $scope.event = event;
      getTripFromTripId(event.trip);
      getBaseFromBaseId(event.base);
      getBases(event.trip);
      pinSingleEvent();
    })
    .catch((error) => {
      console.log("getSingleEvent error", error);
    });
  };

  getSingleEvent();

  let getTripFromTripId = (tripId) => {
    TripFactory.getSingleTripNameFromFB(tripId)
    .then((tripReturned) => {
      $scope.trip = tripReturned;
      filterEditsIfArchived(tripReturned);
    })
    .catch((error) => {
      console.log("getTripFromTripId error", error);
    });
  };

  let filterEditsIfArchived = (trip) => {
    if (trip.archived === false) {
      $('.hide').removeClass("hide");
    }
  };

  let getBaseFromBaseId = (baseId) => {
    BaseFactory.getBaseWithBaseIdFromFB(baseId)
    .then((baseReturned) => {
      $scope.currentBase = baseReturned;
    })
    .catch ((error) => {
      console.log("error in getBaseFromBaseId", error);
    });
  };

  let getBases = (tripId) => {
    BaseFactory.getBasesFromFB(tripId)
    .then((bases) => {
      $scope.bases = bases;
    })
    .catch((error) => {
      console.log("getBases error", error);
    });
  };

  $scope.editEvent = () => {
    EventFactory.editEventInFB($scope.event)
    .then(() => {
      getSingleEvent();
      ngToast.create('Edit successful.');
    })
    .catch((error) => {
      console.log("editEvent error", error);
    });
  };

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

  let map;

  let pinSingleEvent = () => {
    let singleEventToPin = {
      lat: Number($scope.event.latitude), 
      lng: Number($scope.event.longitude)
	  };
	  let map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 12,
	    center: singleEventToPin
	  });
    let icon = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'green',
      fillOpacity: 1,
      strokeColor: 'white',
      strokeWeight: 0.7,
      scale: 12
    };
    let tag = {
      text: 'X',
      color: 'white'
    };
	  let marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      icon: icon,
      label: tag,
      map: map,
      position: singleEventToPin
	  });
	};

  $scope.deleteEvent = (eventToDelete) => {
    let eventToDeleteTrip = eventToDelete.trip;
    EventFactory.deleteEventFromFB(eventToDelete.id)
    .then((result) => {
      $location.url(`/events/${eventToDeleteTrip}`);
    })
    .catch((error) => {
      console.log("deletePin error", error);
    });
  };

});