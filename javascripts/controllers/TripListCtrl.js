app.controller("TripListCtrl", function($rootScope, $routeParams, $scope, BaseFactory, EventFactory, TripFactory) {

  $scope.newTrip = {
      archived: false,
      uid: $rootScope.user.uid
  };

  let getTrips = () => {
    TripFactory.getTripsFromFB($routeParams.uid)
    .then((trips) => {
      $scope.trips = trips;
    })
    .catch((error) => {
      console.log("getTrips error", error);
    });
  };

  getTrips();

  $scope.makeNewTrip = (newTrip) => {
   	TripFactory.makeNewTripInFB(newTrip)
    .then(() => {
    	getTrips();
    })
    .catch((error) => {
    	console.log("error in makeNewTrip", error);
    });
  };

  $scope.editTrip = (trip) => {
		TripFactory.editTripInFB(trip)
    .then(() => {
      getTrips();
	  })
    .catch((error) => {
      console.log("editTripName error", error);
	});
	};

  $scope.deleteEntireTrip = (tripId) => {
    TripFactory.deleteTripFromFB(tripId)
    .then(() => {
      BaseFactory.deleteTripBasesFromFB(tripId);
      EventFactory.deleteTripEventsFromFB(tripId);
      getTrips();
    })
    .catch((error) => {
      console.log("deleteEntireTrip error", error);
    });
  };

});