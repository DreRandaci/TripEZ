app.controller("EventListCtrl", function($location, $rootScope, $routeParams, $scope, EventFactory, TripFactory) {

	let getSingleTripName = () => {
    TripFactory.getSingleTripNameFromFB($routeParams.tripId)
    	.then((tripReturned) => {
      $scope.trip = tripReturned;
    }).catch((error) => {
      console.log("getSingleTripName error", error);
    });
  };

  getSingleTripName();

	let getEvents = () => {
    EventFactory.getEventsFromFB($routeParams.tripId)
    	.then((events) => {
      $scope.events = events;
    }).catch((error) => {
      console.log("getEvents error", error);
    });
  };

  getEvents();

});