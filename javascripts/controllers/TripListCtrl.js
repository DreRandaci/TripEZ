app.controller("TripListCtrl", function($location, $rootScope, $routeParams, $scope, BaseFactory, EventFactory, TripFactory) {

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

  $scope.newTripPopover = {
    templateUrl: "newTripPopover.html",
    tripEndDate: "",
    tripName: "",
		tripStartDate: ""
  };

  $scope.makeNewTrip = () => {
  	let newTrip = {
      archived: false,
  		end: $scope.newTripPopover.tripEndDate,
      name: $scope.newTripPopover.tripName,
      start: $scope.newTripPopover.tripStartDate,
      uid: $rootScope.user.uid
    };
   	TripFactory.makeNewTripInFB(newTrip)
    .then(() => {
    	getTrips();
    })
    .catch((error) => {
    	console.log("error in makeNewTrip", error);
    });
  };

  $scope.editTrip = (trip, newTripName) => {
		let tripToEdit = {
      archived: trip.archived,
			end: trip.end,
      latitude: trip.latitude,
      longitude: trip.longitude,
			start: trip.start,
			uid: $rootScope.user.uid,
			name: newTripName
		};
		TripFactory.editTripInFB(tripToEdit)
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