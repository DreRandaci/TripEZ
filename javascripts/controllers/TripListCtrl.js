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

});