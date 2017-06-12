app.controller("TripListCtrl", function($location, $rootScope, $routeParams, $scope, TripFactory) {

	let getTrips = () => {
    TripFactory.getTripsFromFB($routeParams.uid)
    	.then((trips) => {
      $scope.trips = trips;
    }).catch((error) => {
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

  $scope.editTripName = (trip, newTripName) => {
		let tripToEdit = {
			end: trip.end,
			id: trip.tripId,
			start: trip.start,
			uid: $rootScope.user.uid,
			name: newTripName
		};
		TripFactory.editTripInFB(tripToEdit).then(() => {
			getTrips();
		}).catch((error) => {
			console.log("editTripName error", error);
		});
	};

});