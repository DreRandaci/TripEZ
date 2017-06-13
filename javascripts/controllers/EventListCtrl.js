app.controller("EventListCtrl", function($location, $rootScope, $routeParams, $scope, BaseFactory, EventFactory, TripFactory) {

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
    	console.log("events", events);
      $scope.events = events;
    }).catch((error) => {
      console.log("getEvents error", error);
    });
  };

  getEvents();

  let getBases = () => {
    BaseFactory.getBasesFromFB($routeParams.tripId)
    	.then((bases) => {
      $scope.bases = bases;
    }).catch((error) => {
      console.log("getBases error", error);
    });
  };

  getBases();

});