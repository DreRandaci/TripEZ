app.controller("EventViewCtrl", function($location, $routeParams, $scope, BaseFactory, EventFactory, TripFactory) {

	let getSingleEvent = () => {
    EventFactory.getSingleEventFromFB($routeParams.eventId)
	  	.then((event) => {
	      $scope.event = event;
	      pinSingleEvent();
	      getTripFromTripId(event.trip);
	      getBaseFromBaseId(event.base);
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
    	})
    	.catch((error) => {
      	console.log("getTripFromTripId error", error);
    	});
  };

  let getBaseFromBaseId = (baseId) => {
    BaseFactory.getBaseWithBaseIdFromFB(baseId)
      .then((baseReturned) => {
      	$scope.base = baseReturned;
      })
      .catch ((error) => {
        console.log("error in getBaseFromBaseId", error);
      });
  };

  $scope.editEventAttribute = () => {
  	console.log("in eventAttribute");
		let eventToEdit = {
      address: $scope.event.address,
      base: $scope.event.base,
      end: $scope.event.end,
      latitude: event.geometry.location.lat(),
      longitude: event.geometry.location.lng(),
      name: event.name,
      ref: $scope.event.ref,
      review: searchEvent.review,
      start: $scope.event.start,
      trip: $scope.event.trip,
      type: $scope.event.type
		};
		EventFactory.editEventAttributeInFB(eventToEdit)
      .then(() => {
        getSingleEvent();
		  })
      .catch((error) => {
        console.log("editEventAttribute error", error);
		  });
	};

	let map;

	let pinSingleEvent = () => {
	  let singleEventToPin = {
	  	lat: $scope.event.latitude, 
	  	lng: $scope.event.longitude
	  };
	  let map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 12,
	    center: singleEventToPin
	  });
	  let marker = new google.maps.Marker({
	    position: singleEventToPin,
	    map: map
	  });
	};

});