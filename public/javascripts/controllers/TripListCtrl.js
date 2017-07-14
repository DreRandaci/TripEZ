app.controller("TripListCtrl", function($rootScope, $routeParams, $scope, ngToast, BaseFactory, EventFactory, TripFactory) {

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
      ngToast.create('Trip added to active list.');
    	getTrips();
    })
    .catch((error) => {
    	console.log("error in makeNewTrip", error);
    });
  };

  $scope.editTrip = (trip) => {
		TripFactory.editTripInFB(trip)
    .then(() => {
      ngToast.create('Trip edit successful.');
      getTrips();
	  })
    .catch((error) => {
      console.log("editTripName error", error);
	   });
	};

  $scope.archiveTrip = (trip) => {
    trip.archived = true;
    TripFactory.editTripInFB(trip)
    .then(() => {
      ngToast.create('Trip archived. View Archive to reactivate.');
      getTrips();
    })
    .catch((error) => {
      console.log("archiveTrip error", error);
    });
  };

  $scope.reactivateTrip = (trip) => {
    trip.archived = false;
    TripFactory.editTripInFB(trip)
    .then(() => {
      ngToast.create('Trip reactivated in your Active Trips list.');
      getTrips();
    })
    .catch((error) => {
      console.log("archiveTrip error", error);
    });
  };

  $scope.deleteEntireTrip = (tripId) => {
    TripFactory.deleteTripFromFB(tripId)
    .then(() => {
      BaseFactory.deleteTripBasesFromFB(tripId);
      EventFactory.deleteTripEventsFromFB(tripId);
      ngToast.create('Trip deleted.');
      getTrips();
    })
    .catch((error) => {
      console.log("deleteEntireTrip error", error);
    });
  };

});